import Order from "../models/orderModel.js";

export async function placeOrderRepo(userId, items, totalAmount) {
  try {
    const newOrder = new Order({ userId, items, totalAmount });
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (error) {
    console.error("Error is placeOrderRepo:", error);
    throw error;
  }
}

export async function userOrderRepo(userId) {
  try {
    const orders = await Order.find({ userId: userId }).populate(
      "items.productId"
    );
    return orders;
  } catch (error) {
    console.error("Error is userOrderRepo:", error);
    throw error;
  }
}

export async function orderDetailsRepo(orderId) {
  try {
    const order = await Order.findById(orderId).populate("items.productId");
    return order;
  } catch (error) {
    console.error("Error is orderDetailsRepo:", error);
    throw error;
  }
}
