const Review = require("../models/review");

const reviewController = {
  getAllReviews: async (req, res) => {
    try {
      // get all reviews from the database
      const reviews = await Review.find();

      // send the reviews as a response
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
 
  deleteReview: async (req, res) => {
    try {
      const reviewId = req.params.id;

      await Review.findByIdAndDelete(reviewId);

      res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getReviewsForTrainer: async (req, res) => {
    try {
      // get the book id from the URL parameter
      const bookId = req.params.id;

      // get all reviews with the book id from the database
      const reviews = await Review.find({ bookId }).populate(
        "userId",
        "username"
      );

      // send the reviews as a response
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getReviewsByUser: async (req, res) => {
    try {
      // get the user id from the URL parameter
      const userId = req.params.id;

      // get all reviews with the user id from the database
      const reviews = await Review.find({ userId });

      // send the reviews as a response
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = reviewController;
