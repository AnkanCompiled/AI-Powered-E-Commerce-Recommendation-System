import express from "express";
import {
  loginController,
  registerController,
  roleController,
} from "../controllers/authController.js";
const route = express.Router();

route.post("/register", registerController);
route.post("/login", loginController);
route.get("/role/:id", roleController);

export default route;
