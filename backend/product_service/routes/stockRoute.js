import express from "express";
import { authenticate } from "../middlewares/tokenMiddleware.js";
import {
  checkStockController,
  stockUpdateController,
} from "../controllers/stockController.js";
const stockRoute = express.Router();

stockRoute.post("/:id/update", stockUpdateController);
stockRoute.get("/:id/check", checkStockController);

export default stockRoute;
