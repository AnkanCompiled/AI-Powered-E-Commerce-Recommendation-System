import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import connectDb from "./config/connectDb.js";
import errorHandler from "./errors/errorHandler.js";
import indexRoute from "./routes/indexRoute.js";
dotenv.config();

const app = express();
const Port = process.env.PORT || 3001;
const ProxyUrl = process.env.PROXY_URL;

const whitelist = [ProxyUrl];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", indexRoute);

app.use(errorHandler);

connectDb().then(() => {
  app.listen(Port, () => {
    console.log(`Auth server running at http://localhost:${Port}`);
  });
});
