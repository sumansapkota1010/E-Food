const express = require("express");
const {
  register,
  login,
  forgotPassword,
  verifyOtp,
} = require("../controller/auth/authController");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyOtp").post(verifyOtp);

module.exports = router;
