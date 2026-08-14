import express from "express";
import orderController from "../controllers/orderController.js"
import {Router} from "express";
const router=Router();
router.post("/createOrder",orderController.createOrder)
router.post("/updateOrder/:orderId", orderController.updateOrder)
router.get("/getOrderById/:orderId",orderController.getOrdersByUserId);
router.get("/getAllOrders/",orderController.getAllOrders);
router.delete("/deleteOrderById/:orderId",orderController.deleteOrder);
export default router;


