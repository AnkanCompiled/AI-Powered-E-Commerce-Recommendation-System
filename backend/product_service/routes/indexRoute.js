import express from "express";
import {
  addProductController,
  getAllProductsController,
  getProductByCategoryController,
  getProductByQueryController,
} from "../controllers/productController.js";
const route = express.Router();

route.get("/all", getAllProductsController);
route.post("/add", addProductController);
route.get("/category/:category", getProductByCategoryController);
route.get("/search/:query", getProductByQueryController);

export default route;
