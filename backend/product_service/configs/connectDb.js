import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/ai-e-commerce";

export default async function connectDb() {
  try {
    await mongoose.connect(mongoURI);
    console.log("Product Service:: MongoDB connected");
  } catch (err) {
    console.error("Product Service:: MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
