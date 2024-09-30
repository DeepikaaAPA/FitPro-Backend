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
  disciplines: [String],

  description: String,
  images: [String],
  profilePic:String,
  video: String,
  price: Number,
  languages: String,
  awards: [String],
  qualifications: [String],
});

module.exports = mongoose.model("Trainer", TrainerSchema, "Trainers");
