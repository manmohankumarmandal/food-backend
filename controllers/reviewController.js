import Review from "../models/reviewsModel.js";
const createReview = async (req, res) => {
  const { user, foodItem, rating, review } = req.body;
  try {
    if (!user || !foodItem || !rating) {
      return res.status(404).json({ message: "all field fill are required" });
    }
    const newReview = await Review({
      user,
      foodItem,
      rating,
      review,
    });
    await newReview.save();
    return res.status(200).json({ message: "revies send successfull" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const getAllReviews = async (req, res) => {
  try {
    const allReviews = await Review.find({});

    if (!allReviews) {
      return res.status(404).json({ message: "reviews not found" });
    }
    return res
      .status(200)
      .json({ message: "reviews fetch successfull", allReviews });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const getReviewById = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const review = await review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "reviews not found" });
    }
    return res.status(200).json({ message: "review fetch successfull" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const updateReviewById = async (req, res) => {
  const { reviewId } = req.params;
  //const {user,foodItem,rating,review}=req.body;
  try {
    const updateReview = await review.findByIdAndUpdate(reviewId);
    if (!updateReview) {
      // const newReview=new review({
      //     user,
      //     foodItem,
      //     rating,
      //     review
      // })
      // await newReview.save();
      return res.status(404).json({ message: "reviews not found" });
    }
    return res.status(200).json({ message: "review updated successfull" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const deleteReviewById = async (req, res) => {
  const { reviewId } = req.params;
  try {
    const deleteReview = await review.findByIdAndDelete(reviewId);
    if (!deleteReview) {
      return res.status(404).json({ message: "reviews not found" });
    }
    return res.status(200).json({ message: "review deleted successfull" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
const deleteAllReviews = async (req, res) => {
  try {
    const deletedReviews = await review.deleteMany({});
    if (!deletedReviews) {
      return res.status(404).json({ message: "reviews not found" });
    }
    return res
      .status(200)
      .json({ message: " All reviews deleted successfull" });
  } catch (err) {
    return res.status(500).json({ message: "server error" });
  }
};
export default {
  createReview,
  getAllReviews,
  getReviewById,
  updateReviewById,
  deleteReviewById,
  deleteAllReviews,
};
