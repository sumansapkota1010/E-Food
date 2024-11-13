const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/userModel");
const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({
      message: "Please login",
    });
  }
  const token = authHeader.split(" ")[1];

  //pathayo bhaney k garne
  //verify if the token is legit or not
  /*  jwt.verify(token, process.env.SECRET_KEY, (err, success) => {
    if (err) {
      res.status(400).json({
        message: "Invalid token",
      });
    } else {
      res.status(200).json({
        message: "Valid Token",
      });
    }
  }); */
  //alternative
  //token lai decrypt gareko
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  if (!decoded) {
    return res.status(400).json({
      message: "Don't try to do this",
    });
  }
  // check if decoded.id(userId) exists in the user table
  const doesUserExist = await User.findOne({ _id: decoded.id });
  if (!doesUserExist) {
    return res.status(400).json({
      message: "User doesnot exists with that token/id",
    });
  }
  req.user = doesUserExist;
  next();
};

module.exports = isAuthenticated;
