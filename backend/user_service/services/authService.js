import bcrypt from "bcryptjs";
import AppError from "../errors/appError.js";
import { registerDb, findUserByEmail } from "../db/userDb.js";
import { createToken } from "../middlewares/tokenMiddleware.js";

export async function registerService(name, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await registerDb(name, email, hashedPassword);
    const token = createToken({ id: newUser._id });
    return token;
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("Email already exists", 400);
    }

    console.error("Error is registerService:", error);
    throw new AppError(error.message, error.statusCode || 500);
  }
}

export async function loginService(email, password) {
  try {
    const user = await findUserByEmail(email);
    if (!user) throw new AppError("User not found", 404);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid credentials", 400);

    const token = createToken({ id: user._id });
    return token;
  } catch (error) {
    throw new AppError(
      error.message || "Internal Server Error",
      error.statusCode || 500
    );
  }
}
