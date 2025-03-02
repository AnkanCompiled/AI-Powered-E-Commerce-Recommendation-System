import axios from "axios";
import AppError from "../../user_service/errors/appError.js";
import dotenv from "dotenv";
dotenv.config();

export async function productStockUpdateService(productId, operation, amount) {
  try {
    const stockApi = await axios.post(
      `${
        process.env.PROXY_URL || "http://localhost:3000"
      }/api/products/stock/${productId}/update`,
      {
        operation: operation,
        amount: amount,
      }
    );
    return stockApi.data;
  } catch (error) {
    console.error("Error is productStockUpdateService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function productStockCheckService(productId) {
  try {
    if (!productId) throw new AppError("Product id not present", 400);
    const stockApi = await axios.get(
      `${
        process.env.PROXY_URL || "http://localhost:3000"
      }/api/products/stock/${productId}/check`
    );
    return stockApi.data;
  } catch (error) {
    console.error("Error is productStockCheckService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
