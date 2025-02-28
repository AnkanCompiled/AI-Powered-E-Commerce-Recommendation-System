import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

export const createToken = (object, time = "7d") => {
  const token = jwt.sign(object, jwtSecret, {
    expiresIn: time,
  });
  return token;
};
