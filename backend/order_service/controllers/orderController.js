import {
  orderDetailsService,
  placeOrderService,
  userOrderService,
} from "../services/orderService.js";

export async function placeOrderController(req, res, next) {
  try {
    const { id } = req.user;
    const { items } = req.body;
    const order = await placeOrderService(id, items);
    res
      .status(201)
      .json({ message: "Order placed successfully", order: order });
  } catch (error) {
    next(error);
  }
}

export async function userOrderController(req, res, next) {
  try {
    const { id } = req.user;
    const orders = await userOrderService(id);
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
}

export async function orderDetailsController(req, res, next) {
  try {
    const { id } = req.params;
    const order = await orderDetailsService(id);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
}
