const { default: mongoose } = require("mongoose");

const TrainerSchema = new mongoose.Schema({
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
  appliedOn: {
    type: Date,
  },
  approvedOn: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Trainer", TrainerSchema, "Trainers");
