import express from "express";
import httpProxy from "http-proxy";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const Port = process.env.PORT || 3000;
const FrontEndUrl = process.env.FRONT_END_URL;
const UserServiceUrl = process.env.USER_SERVICE_URL;
const proxy = httpProxy.createProxyServer();

const whitelist = [FrontEndUrl, UserServiceUrl];

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

// Proxy requests to user service
app.all("/api/users/*", (req, res) => {
  console.log(`Proxying users request: ${req.method} ${req.originalUrl}`);
  proxy.web(req, res, {
    target: UserServiceUrl,
    changeOrigin: true,
  });
});

proxy.on("error", (err, req, res) => {
  console.error("Proxy error:", err);
  res.status(500).json({ error: "Proxy error", details: err.message });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(Port, () => {
  console.log(`Proxy server running at http://localhost:${Port}`);
});
