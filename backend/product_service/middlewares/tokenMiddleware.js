import jwt from "jsonwebtoken";
import AppError from "../../user_service/errors/appError.js";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Please login to access this route", 401));
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return next(new AppError("Invalid token", 401));
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    return next(new AppError("Authentication error", 401));
  }
};

export const createToken = (object, time = "7d") => {
  const token = jwt.sign(object, jwtSecret, {
    expiresIn: time,
  });
  return token;
};
