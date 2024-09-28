const { default: mongoose } = require("mongoose");

const RejectedApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: String,
  phone: String,
  firstname: String,
  lastname: String,
  discipline: String,
  experience: Number,
  reason: String,
  appliedOn: {
    type: Date,
  },
  rejectedOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model(
  "RejectedApplication",
  RejectedApplicationSchema,
  "RejectedApplications"
);
