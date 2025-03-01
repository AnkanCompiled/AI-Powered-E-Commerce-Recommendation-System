import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
const route = express.Router();

route.post("/register", registerController);
route.post("/login", loginController);

export default route;
