const express = require("express");
const mongoose = require("mongoose");

const { connectDatabase } = require("./database/database");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase(process.env.MONGO_URI);

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
