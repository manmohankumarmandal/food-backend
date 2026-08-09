import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import listRouter from "./routes/listRoute.js";
import paymentRouter from "./routes/paymentRoute.js";
import reviewRouter from "./routes/reviewRoute.js";
import addCartRouter from "./routes/addCartRoute.js";
import getCartRouter from "./routes/getCartRoute.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const MONGODB_URI = process.env.MONGODB_URI;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-frontend-wheat.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
  })
);

app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/product", productRouter);
app.use("/api/list", listRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);
app.use("/api/cart", addCartRouter);
app.use("/api/cart", getCartRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB Error:", err);
  });

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Food backend API is running",
  });
});

export default app;