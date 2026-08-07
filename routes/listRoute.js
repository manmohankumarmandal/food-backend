import express from "express";
import listController from "../controllers/listController.js"
import {Router} from "express";

const router=Router();
router.post("/createList",listController.createList);
router.get("/getAllList",listController.getAllList);
router.get("/getListById/:listId",listController.getListById);
router.put("/updateListById/:listId",listController.updateListById);
router.delete("/deleteListById/:listId",listController.deleteListById);
router.delete("/deleteAllList",listController.deleteAllList);
export default router;