const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { connectDatabase } = require("./database/database");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase(process.env.MONGO_URI);

//Routes

app.use("/api", authRoute);

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
