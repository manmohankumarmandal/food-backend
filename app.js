import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
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

const port = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  }),
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
    console.log("mongodb connected succesfully");
  })
  .catch((err) => {
    console.error("MongoDB Error:");
    console.error("Name:", err.name);
    console.error("Message:", err.message);
    console.error("Code:", err.code);
    console.error(err);
  });

app.listen(port, () => {
  console.log(`app listen in ${port}`);
});
