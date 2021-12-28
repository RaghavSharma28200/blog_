const express = require("express");
const { protect } = require("../controllers/authController");
const { allComment } = require("../controllers/commentController");
const {
  createPost,
  getAllPosts,
  updatePost,
  uploadUserPhoto,
  resizeUserPhoto,
  deletePost,
  getPost,
  myPosts,
  SortPostByDate,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:post", getPost);

router.use(protect);

router.route("/").post(uploadUserPhoto, resizeUserPhoto, createPost);

router.get("/post/myPosts", myPosts, getAllPosts);
router
  .route("/:post")
  .patch(uploadUserPhoto, resizeUserPhoto, updatePost)
  .delete(deletePost);

module.exports = router;
