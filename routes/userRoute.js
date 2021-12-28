const express = require("express");
const {
  signup,
  login,
  protect,
  updatePassword,
  logout,
} = require("../controllers/authController");
const {
  getAllUsers,
  uploadUserPhoto,
  resizeUserPhoto,
  updateMe,
  getMe,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

// router.route("/:id").get(getUser);
router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/", getAllUsers);
// router.get("/:id", getUser);

router.use(protect);
router.get("/me", getMe, getUser);

router.patch("/updateMyPassword", updatePassword);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);

module.exports = router;
