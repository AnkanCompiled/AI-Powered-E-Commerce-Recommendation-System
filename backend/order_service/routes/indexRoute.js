import express from "express";
import { authenticate } from "../middlewares/tokenMiddleware.js";
import {
  orderDetailsController,
  placeOrderController,
  userOrderController,
} from "../controllers/orderController.js";
const route = express.Router();

route.post("/place", authenticate, placeOrderController);
route.get("/user", authenticate, userOrderController);
route.get("/details/:id", orderDetailsController);

export default route;
