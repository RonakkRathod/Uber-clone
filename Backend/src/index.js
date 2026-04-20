import http from "http";
import app from "./app.js";
import { connectDB } from "./DB/index.js" 

connectDB();

const server = http.createServer(app);
const PORT = process.env.PORT || 7000;  


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});