const express = require("express");

const { connectDatabase } = require("./database/database");
require("dotenv").config();
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase(process.env.MONGO_URI);

//Routes

app.use("/api", authRoute);
app.use("/api", productRoute);

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
