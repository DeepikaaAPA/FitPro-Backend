const { default: mongoose } = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user: { type: Object },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
  },
  trainer: { type: Object },
  review: String,
  rating: Number,

  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", ReviewSchema, "reviews");
