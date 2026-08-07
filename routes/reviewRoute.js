import express from "express";
import reviewController from "../controllers/reviewController.js"
import {Router} from "express";
const router=Router();
router.post("/createReview",reviewController.createReview);
router.get("/getAllReviews",reviewController.getAllReviews);
router.get("/getReviewById/:reviewId",reviewController.getReviewById);
router.put("/updateReviewById/:reviewId",reviewController.updateReviewById);
router.delete("/deleteReviewById/:reviewId",reviewController.deleteReviewById);
router.delete("/deleteAllReviews",reviewController.deleteAllReviews);
export default router;