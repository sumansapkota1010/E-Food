const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { connectDatabase } = require("./database/database");
const User = require("./model/userModel");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase(process.env.MONGO_URI);

app.post("/register", async (req, res) => {
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
});

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
