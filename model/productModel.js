const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product Name must be provided"],
    },
    productDescription: {
      type: String,
      required: [true, "Product Description must be provided"],
    },
    productStockQty: {
      type: Number,
      required: [true, "ProductQty must be provided"],
    },
    productPrice: {
      type: Number,
      required: [true, "Product Price must be provided"],
    },
    productStatus: {
      type: String,
      enum: ["available", "unavailable"],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
