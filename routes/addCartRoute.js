import express from "express";
import cartController from "../controllers/cartController.js";

const router = express.Router();

router.post("/addToCart", cartController.addToCart);


export default router;
