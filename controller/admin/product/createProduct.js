const Product = require("../../../model/productModel");

const createProduct = (req, res) => {
  const {
    productName,
    productDescription,
    productStockQty,
    productPrice,
    productStatus,
  } = req.body;
  if (
    !productName ||
    !productDescription ||
    !productStockQty ||
    !productPrice ||
    !productStatus
  ) {
    return res.status(400).json({
      message:
        "Please provide product name, description,quantity,price and status",
    });
  }
  Product.create({
    productName,
    productDescription,
    productStockQty,
    productPrice,
    productStatus,
  });
  res.status(200).json({
    message: "Product created successfully",
  });
};

module.exports = createProduct;
