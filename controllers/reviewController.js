const Review = require('../models/Review');

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
    createReview: async (req, res) => {
        try {
            // get the user id from the request
            const userId = req.userId;

            // get the book id from the URL parameter
            const bookId = req.params.id;

            // get the content from the request body
            const { content } = req.body;

            // create a new review object
            const review = new Review({
                userId,
                bookId,
                content,
            });

            // save the review to the database
            await review.save();

            // send the review as a response
            res.status(201).json({ message: 'Review created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getReviewById: async (req, res) => {
        try {
            // get the review id from the URL parameter
            const reviewId = req.params.id;

            // get the review from the database
            const review = await Review.findById(reviewId);

            // send the review as a response
            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updateReview: async (req, res) => {
        try {
            const reviewId = req.params.id;

            const { content } = req.body;

            await Review.findByIdAndUpdate(reviewId, { content });

            res.status(200).json({ message: 'Review updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteReview: async (req, res) => {
        try {
            const reviewId = req.params.id;

            await Review.findByIdAndDelete(reviewId);

            res.status(200).json({ message: 'Review deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getReviewsByBook: async (req, res) => {
        try {
            // get the book id from the URL parameter
            const bookId = req.params.id;

            // get all reviews with the book id from the database
            const reviews = await Review.find({ bookId }).populate('userId', 'username');

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
    }
}

module.exports = reviewController;