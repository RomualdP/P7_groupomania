const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.config");

const postController = require("../controllers/post.controller");

router.get("/", postController.getPost);
router.post("/", multer, postController.createPost);
router.put("/:id", multer, postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch("/like/:id", postController.likePost);
router.patch("/unlike/:id", postController.unlikePost);

// Comments

router.patch("/comment/:id", postController.commentPost);
router.patch("/edit-comment/:id", postController.editCommentPost);
router.patch("/delete-comment/:id", postController.deleteCommentPost);

module.exports = router;
