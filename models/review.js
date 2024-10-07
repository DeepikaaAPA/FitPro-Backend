const { default: mongoose } = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
   trainerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainer',
    },
    content: String,
    rating:Number,
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