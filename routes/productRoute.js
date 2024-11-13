const express = require("express");
const createProduct = require("../controller/admin/product/createProduct");
const isAuthenticated = require("../middleware/isAuthenticated");
const restrictTo = require("../middleware/restrictTo");

const router = express.Router();

router
  .route("/createproduct")
  .post(isAuthenticated, restrictTo("admin"), createProduct);

module.exports = router;
