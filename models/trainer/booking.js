const { default: mongoose } = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  user: { type: Object },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trainer: { type: Object },
  bookedDate: Date,
  bookedSlot: String,
  bookedOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Booking", BookingSchema, "Bookings");
