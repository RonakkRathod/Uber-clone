import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"
import UserRouter from "./routes/user.routes.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello Ronak!");
});

app.use("/api/v1/users", UserRouter);

export default app;