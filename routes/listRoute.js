import express from "express";
import listController from "../controllers/listController.js";
import { Router } from "express";
import authMiddleware from "../middleware/authMiddleare.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = Router();
router.post(
  "/createList",
  authMiddleware,
  adminMiddleware,
  listController.createList,
);
router.get("/getAllList", listController.getAllList);
router.get("/getListById/:listId", listController.getListById);
router.put(
  "/updateListById/:listId",
  authMiddleware,
  adminMiddleware,
  listController.updateListById,
);
router.delete(
  "/deleteListById/:listId",
  authMiddleware,
  adminMiddleware,
  listController.deleteListById,
);
router.delete(
  "/deleteAllList",
  authMiddleware,
  adminMiddleware,
  listController.deleteAllList,
);
export default router;
