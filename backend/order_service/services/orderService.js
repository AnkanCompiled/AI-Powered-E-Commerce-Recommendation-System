import AppError from "../../user_service/errors/appError.js";
import {
  orderDetailsRepo,
  placeOrderRepo,
  userOrderRepo,
} from "../repos/orderRepo.js";
import {
  productStockCheckService,
  productStockUpdateService,
} from "./stockService.js";

export async function placeOrderService(userId, items) {
  try {
    if (!userId || !items || items.length === 0)
      throw new AppError("Invalid order data", 400);
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    for (const item of items) {
      const product = await productStockCheckService(item.productId);
      if (product.stock < item.quantity) {
        throw new AppError(
          `Not enough stock for product: ${item.productId}`,
          400
        );
      }
    }

    const newOrder = await placeOrderRepo(userId, items, totalAmount);
    await Promise.all(
      items.map((item) =>
        productStockUpdateService(item.productId, "subtract", item.quantity)
      )
    );
    return newOrder;
  } catch (error) {
    console.error("Error is placeOrderService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function userOrderService(userId) {
  try {
    const orders = await userOrderRepo(userId);
    if (!orders.length) throw new AppError("No orders found", 400);
    return orders;
  } catch (error) {
    console.error("Error is userOrderService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function orderDetailsService(orderId) {
  try {
    const order = await orderDetailsRepo(orderId);
    if (!order) throw new AppError("Order not found", 400);
    return order;
  } catch (error) {
    console.error("Error is orderDetailsService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
