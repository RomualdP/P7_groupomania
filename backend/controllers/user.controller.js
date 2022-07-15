const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
};

module.exports.getOneUser = async (req, res) => {
  console.log(req.params);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.findOne({ _id: req.params.id })
    .then((user) => res.status(200).json(user))
    .catch((error) => res.status(404).json({ error }));
};

module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        position: req.body.position,
      },
    }
  )
    .then(() => res.status(200).json({ message: "Bio modified !" }))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  UserModel.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Deleted!" }))
    .catch((error) => res.status(400).json({ error }));
};

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
