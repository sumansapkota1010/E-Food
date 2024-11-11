const mongoose = require("mongoose");
const User = require("../model/userModel");

exports.connectDatabase = async (URI) => {
  await mongoose.connect(URI);
  console.log("Database connected Successfull");

  //admin seeding

  //check whether admin exist or not

  const adminExists = await User.findOne({ userEmail: "admin@gmail.com" });
  if (!adminExists) {
    await User.create({
      userEmail: "admin@gmail.com",
      userPassword: "admin",
      userPhoneNumber: "9840300081",
      userName: "admin",
      role: "admin",
    });
    console.log("Admin Seeded Successfully");
  } else {
    console.log("Admin already seeded");
  }
};
