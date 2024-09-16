const { default: mongoose } = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    description: String,
    image: String,
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Book', BookSchema, 'books');