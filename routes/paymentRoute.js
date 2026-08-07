import express from "express";
import paymentOrder from "../controllers/paymentOrderController.js";
import {Router} from "express";
const router=Router();
router.post("/paymentOrder",paymentOrder.createPaymentOrder);
export default router;