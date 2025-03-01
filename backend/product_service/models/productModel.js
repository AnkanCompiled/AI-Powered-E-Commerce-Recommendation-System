import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
