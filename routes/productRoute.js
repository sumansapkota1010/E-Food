const express = require("express");
const createProduct = require("../controller/admin/product/createProduct");

const router = express.Router();

router.route("/createproduct").post(createProduct);

module.exports = router;
