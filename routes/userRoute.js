import express from "express";
import {Router} from "express";
import userController from "../controllers/userController.js"
const router=Router();
router.get("/test", (req, res) => {
  res.send("User route working ");
});
router.post("/signup",userController.signup);
router.post("/login",userController.login);
export default router;