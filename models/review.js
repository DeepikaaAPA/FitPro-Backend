const { default: mongoose } = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    content: String,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Review', ReviewSchema, 'reviews');