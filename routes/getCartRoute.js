import express from "express";
import cartController from "../controllers/cartController.js";

const router = express.Router();


router.get("/getCartItems", cartController.getCartItems);

export default router;