const express = require("express");
const {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
} = require("../controller/auth/authController");
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotPassword);
router.route("/verifyOtp").post(verifyOtp);
router.route("/resetpassword").post(resetPassword);

module.exports = router;
