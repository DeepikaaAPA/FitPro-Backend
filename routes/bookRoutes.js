const express = require('express');
const bookController = require('../controllers/bookController');
const book = require('../models/book');
const auth = require('../utils/auth');

const bookRouter = express.Router();

bookRouter.post('/', auth.verifyToken, auth.isAdmin, bookController.createBook);
bookRouter.get('/', auth.verifyToken, bookController.getBooks);
bookRouter.get('/:id', auth.verifyToken, bookController.getBook);
bookRouter.put('/:id', auth.verifyToken, auth.isAdmin, bookController.updateBook);
bookRouter.delete('/:id', auth.verifyToken, auth.isAdmin, bookController.deleteBook);

module.exports = bookRouter;