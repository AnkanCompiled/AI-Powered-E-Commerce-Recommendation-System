import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    tags: { type: [String], default: [] },
    imageUrl: { type: String, required: true },
    stock: { type: Number, required: true, min: 0, default: 0 },
    discount: { type: Number, default: 0 },
    ratings: { type: Number, default: 0, min: 0, max: 5 },
    reviews: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: String,
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
export default Product;
