import express from "express";
import productController from "../controllers/productController.js"
import {Router} from "express";

const router=Router();
router.post("/createProduct",productController.createProduct);
router.get("/getAllProduct",productController.getAllProduct);
router.get("/getProductById/:productId",productController.getProductById);
router.put("/updateProductById/:listId",productController.updateProductById);
router.delete("/deleteProductById/:listId",productController.deleteProductById);
router.delete("/deleteAllProduct",productController.deleteAllProduct);
export default router;