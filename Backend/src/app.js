import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors"


const app = express();
app.use(cors());

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
  res.send("Hello Ronak!");
});


export default app;