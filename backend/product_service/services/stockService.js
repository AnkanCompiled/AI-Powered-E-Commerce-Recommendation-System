import AppError from "../../user_service/errors/appError.js";
import { checkStockRepo, stockUpdateRepo } from "../repos/stockRepo.js";

export async function stockUpdateService(productId, operation, amount) {
  try {
    if (!["add", "subtract"].includes(operation)) {
      throw new AppError("Invalid operation", 400);
    }
    const product = await stockUpdateRepo(productId, operation, amount);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  } catch (error) {
    console.error("Error is stockUpdateService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function checkStockService(productId) {
  try {
    const stock = await checkStockRepo(productId);
    return stock;
  } catch (error) {
    console.error("Error is stockUpdateService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
