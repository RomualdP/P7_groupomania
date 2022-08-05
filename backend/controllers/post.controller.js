const PostModel = require("../models/post.model");
const ObjectID = require(`mongoose`).Types.ObjectId;
const fs = require("fs");

module.exports.getPost = (req, res) => {
  PostModel.find((err, data) => {
    if (!err) res.send(data);
    else console.log("error to get data :" + err);
  }).sort({ createdAt: -1 });
};
module.exports.createPost = async (req, res) => {
  let postData = {};
  if (req.file) {
    postData = {
      posterId: req.body.posterId,
      message: req.body.message,
      picture: `../images/${req.file.filename}`,
      likers: [],
      comments: [],
    };
  } else {
    postData = {
      posterId: req.body.posterId,
      message: req.body.message,
      likers: [],
      comments: [],
    };
  }
  const post = new PostModel(postData);

  post
    .save()
    .then(() => res.status(201).json({ message: "Post créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  let updatedRecord = {};

  if (req.file) {
    updatedRecord = {
      message: req.body.message,
      picture: `../images/${req.file.filename}`,
    };
  } else {
    updatedRecord = {
      message: req.body.message,
    };
  }

  PostModel.updateOne(
    { _id: req.params.id },
    {
      $set: updatedRecord,
    },
    {
      new: true,
    },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("il y a une erreur" + err);
    }
  );
};

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  PostModel.findOne({ _id: req.params.id })
    .then((post) => {
      const filename = post.picture.split("/images/")[1];
      console.log(filename);
      fs.unlink(`images/${filename}`, () => {
        PostModel.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Objet supprimé !" });
          })
          .catch((error) => res.status(401).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.updateOne(
    { _id: req.params.id },
    {
      $addToSet: { likers: req.body.id },
    },
    { new: true }
  )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.updateOne(
    { _id: req.params.id },
    {
      $pull: { likers: req.body.id },
    },
    { new: true }
  )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.commentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.updateOne(
    { _id: req.params.id },
    {
      $push: {
        comments: {
          commenterId: req.body.commenterId,
          text: req.body.text,
          timestamp: new Date().getTime(),
        },
      },
    },
    {
      new: true,
    }
  )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.editCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  PostModel.updateOne(
    {
      _id: req.params.id,
      "comments._id": req.body.commentId,
    },
    {
      $set: {
        "comments.$.text": req.body.text,
      },
    }
  )
    .then((docs) => res.send(docs))
    .catch((err) => res.status(500).send({ message: err }));
};

module.exports.deleteCommentPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  PostModel.updateOne(
    { _id: req.params.id },
    {
      $pull: { comments: { _id: req.body.commentId } },
    },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("il y a une erreur" + err);
    }
  );
};
