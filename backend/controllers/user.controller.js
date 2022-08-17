const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const PostModel = require("../models/post.model");

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find()
    .select("-password")
    .exec()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
};

module.exports.getOneUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findOne({ _id: req.params.id })
    .select("-password")
    .exec()
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

module.exports.updateUser = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  req.file
    ? UserModel.findOne({ _id: req.params.id }).then((user) => {
        if (user.picture) {
          const filename = user.picture.split("/images/")[1];
          fs.unlink(`./images/${filename}`, () => {
            UserModel.findOneAndUpdate(
              { _id: req.params.id },
              {
                $set: {
                  position: req.body.position,
                  picture: `http://localhost:8080/images/${req.file.filename}`,
                },
              },
              {
                returnOriginal: false,
              }
            )
              .then((user) => res.status(200).json(user))
              .catch((error) => res.status(400).json({ error }));
          });
        }
      })
    : UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            position: req.body.position,
          },
        },
        {
          returnOriginal: false,
        }
      )
        .then((user) => res.status(200).send(user))
        .catch((error) => res.status(400).json({ error }));
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findOne({ _id: req.params.id }).then((user) => {
    if (user.picture) {
      const filename = user.picture.split("/images/")[1];
      fs.unlink(`./images/${filename}`, () => {
        UserModel.deleteOne({ _id: req.params.id })
          .then(() => {
            PostModel.deleteMany({ posterId: req.params.id })
              .then(() => res.status(200).json({ message: "Deleted!" }))
              .catch((error) => res.status(400).json({ error }));
          })
          .catch((error) => res.status(400).json({ error }));
      });
    } else {
      UserModel.deleteOne({ _id: req.params.id })
        .then(() => {
          PostModel.deleteMany({ posterId: req.params.id })
            .then(() => res.status(200).json({ message: "Deleted!" }))
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(400).json({ error }));
    }
  });
};

// Routes available for futher features to be deployed

module.exports.follow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  UserModel.updateOne(
    { _id: req.params.id },
    {
      $addToSet: {
        following: req.body.topicFollowed,
      },
    }
  )
    .then(() => res.status(200).json({ message: "New topic followed !" }))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.unfollow = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.updateOne(
    { _id: req.params.id },
    {
      $pull: {
        following: req.body.topicFollowed,
      },
    }
  )
    .then(() => res.status(200).json({ message: "Topic unfollowed!" }))
    .catch((error) => res.status(400).json({ error }));
};
