import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
const route = express.Router();

route.use("/register", registerController);
route.use("/login", loginController);

export default route;
