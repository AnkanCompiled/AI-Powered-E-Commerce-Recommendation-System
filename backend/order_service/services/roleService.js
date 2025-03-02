import axios from "axios";
import AppError from "../../user_service/errors/appError.js";
import dotenv from "dotenv";
dotenv.config();

export async function roleCheckService(id, role) {
  try {
    const roleApi = await axios.get(
      `${process.env.PROXY_URL || "http://localhost:3000"}/api/users/role/${id}`
    );
    if (!role.includes(roleApi.data.role))
      throw new AppError("Permission Denied", 401);
  } catch (error) {
    console.error("Error is roleCheckService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}
