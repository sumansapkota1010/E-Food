const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userEmail: {
    type: String,
    required: [true, "Email must be provided"],
  },
  userPhoneNumber: {
    type: Number,
    required: [true, "Phone Number must be provided"],
  },
  userPassword: {
    type: String,
    required: [true, "Password must be provided"],
  },
  userName: {
    type: String,
    required: [true, "Username must be provided"],
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer",
  },
  otp: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
