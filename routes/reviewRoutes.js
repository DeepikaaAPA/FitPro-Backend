const express = require('express');

const reviewRouter = express.Router();
const auth = require('../utils/auth');
const reviewController = require('../controllers/reviewController');

reviewRouter.get('/book/:id', auth.verifyToken, reviewController.getReviewsByBook);
reviewRouter.get('/user/:id', auth.verifyToken, auth.isAdmin, reviewController.getReviewsByUser);
reviewRouter.get('/', auth.verifyToken, auth.isAdmin, reviewController.getAllReviews);
reviewRouter.get('/:id', auth.verifyToken, auth.isAdmin, reviewController.getReviewById);
reviewRouter.post('/book/:id', auth.verifyToken, reviewController.createReview);
reviewRouter.put('/:id', auth.verifyToken, auth.isAdmin, reviewController.updateReview);
reviewRouter.delete('/:id', auth.verifyToken, auth.isAdmin, reviewController.deleteReview);

module.exports = reviewRouter;