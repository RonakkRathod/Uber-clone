import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"
import cookieParser from "cookie-parser";
import UserRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello Ronak!");
});

// http://localhost:7000/api/v1/users
app.use("/api/v1/users", UserRouter);

// Centralized error handler 
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

export default app;