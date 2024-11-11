const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../model/userModel");
const sendEmail = require("../../services/sendEmail");

exports.register = async (req, res) => {
  const { email, password, phoneNumber, username } = req.body;
  if (!email || !password || !phoneNumber || !username) {
    return res.status(400).json({
      message: "Please provide email,password,phonenumber and username",
    });
  }

  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "User with that email already exists",
    });
  }

  await User.create({
    userName: username,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
    userPhoneNumber: phoneNumber,
  });

  res.status(200).json({
    message: "User registered successfully",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide email and password",
    });
  }
  const userFound = await User.find({ userEmail: email });
  if (userFound.length === 0) {
    return res.status(400).json({
      message: "User with that email is not registered",
    });
  }
  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);

  if (isMatched) {
    //generate token

    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "User Logged in Successfully",
      token,
    });
  } else {
    res.status(404).json({
      message: "Invalid Password",
    });
  }
};

// forgot password

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      message: "Please provide an email",
    });
  }

  try {
    const userExists = await User.findOne({ userEmail: email });

    if (!userExists) {
      return res.status(404).json({
        message: "Email is not registered",
      });
    }

    const otp = Math.floor(1000 + Math.random() * 9000);

    userExists.otp = otp;
    await userExists.save();

    await sendEmail({
      email: email,
      subject: "Password Reset Request",
      message: `Your OTP is ${otp}`,
    });

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({
      message: "There was an error sending the email",
    });
  }
};

//verify otp

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      message: "Please provide email and otp",
    });
  }

  const userExists = await User.findOne({ userEmail: email });

  if (!userExists) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }

  if (userExists.otp !== otp) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }
  // OTP is correct, dispose of it by setting it to undefined
  userExists.otp = undefined;
  userExists.isOtpVerified = true;
  await userExists.save();

  res.status(200).json({
    message: "OTP is correct",
  });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;
  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({
      message: "Please provide email,newpassword and confirm password",
    });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({
      message: "New password and Confirm Password doesnot match",
    });
  }
  const userExists = await User.find({ userEmail: email });
  if (userExists.length == 0) {
    return res.status(400).json({
      message: "User is not registered",
    });
  }
  if (userExists[0].isOtpVerified !== true) {
    return res.status(400).json({
      message: "You don't have permission to change password",
    });
  }
  userExists[0].userPassword = bcrypt.hashSync(newPassword, 10);
  userExists[0].isOtpVerified = false;
  await userExists[0].save();
  res.status(200).json({
    message: "Password changed successfully",
  });
};
