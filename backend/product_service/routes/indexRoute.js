import express from "express";
import {
  addProductController,
  getAllProductsController,
  getProductByCategoryController,
  getProductByQueryController,
} from "../controllers/productController.js";
import { authenticate } from "../middlewares/tokenMiddleware.js";
import stockRoute from "./stockRoute.js";
const route = express.Router();

route.get("/all", authenticate, getAllProductsController);
route.post("/add", authenticate, addProductController);
route.get("/category/:category", getProductByCategoryController);
route.get("/search/:query", getProductByQueryController);
route.use("/stock", stockRoute);

export default route;
