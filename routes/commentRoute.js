const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createComment,
  allComment,
} = require("../controllers/commentController");

const router = express.Router();
router.post("/", protect, createComment);

router.get("/", allComment);

module.exports = router;
