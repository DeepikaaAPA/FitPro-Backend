const Book = require('../models/book');

const bookController = {
    createBook: async (req, res) => {
        try {
            // get the book data from the request body
            const book = req.body;

            // check if the book already exists
            const existingBook = await Book.findOne({ title: book.title });

            if (existingBook) {
                return res.status(400).json({ message: 'Book already exists' });
            }

            // create a new book
            const newBook = await Book(book);

            // save the book to the database
            await newBook.save();

            res.status(201).json({ message: 'Book created successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getBooks: async (req, res) => {
        try {
            const books = await Book.find().select('-__v');

            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getBook: async (req, res) => {
        try {
            const bookId = req.params.id;

            const book = await Book.findById(bookId).select('-__v');

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            res.status(200).json(book);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    updateBook: async (req, res) => {
        try {
            const bookId = req.params.id;

            const { title, author, genre, description, image } = req.body;

            const book = await Book.findById(bookId);

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            await Book.findByIdAndUpdate(bookId, {
                title,
                author,
                genre,
                description,
                image,
                updated_at: Date.now(),
            });

            res.status(200).json({ message: 'Book updated successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    deleteBook: async (req, res) => {
        try {
            const bookId = req.params.id;

            const book = await Book.findById(bookId);

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            await Book.findByIdAndDelete(bookId);

            res.status(200).json({ message: 'Book deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = bookController;