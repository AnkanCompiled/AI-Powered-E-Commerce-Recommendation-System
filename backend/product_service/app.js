import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./configs/connectDb.js";
import errorHandler from "./errors/errorHandler.js";
import indexRoute from "./routes/indexRoute.js";
dotenv.config();

const app = express();
const Port = process.env.PORT || 3002;
const ProxyUrl = process.env.PROXY_URL || "http://localhost:3000";

const whitelist = [ProxyUrl];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/products", indexRoute);

app.use(errorHandler);

connectDb().then(() => {
  app.listen(Port, () =>
    console.log(`Product server running at http://localhost:${Port}`)
  );
});
