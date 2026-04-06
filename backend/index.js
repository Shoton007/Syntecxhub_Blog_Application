import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"; 
import { connectDB } from "./config/connectionDB.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser()); 

// CORS configuration - 5173 ke full permission dewa holo
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"], 
    credentials: true,               
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// API Check Route
app.get("/", (req, res) => {
    res.send("<h1 style='text-align:center; color:blue;'>Blog App Backend is running on Port 8080! 🚀</h1>");
});

// API ENDPOINTS
app.use("/images", express.static("uploads"));
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});