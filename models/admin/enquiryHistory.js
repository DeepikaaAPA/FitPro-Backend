// import mongoose
const mongoose = require("mongoose");
// create  a new schema
const enquiryHistorySchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  phone: String,
  query: String,
  enquiredOn: Date,
  closedOn: {
    type: Date,
    default: Date.now(),
  },
});

// create a new model and export it
module.exports = mongoose.model(
  "EnquiryHistory",
  enquiryHistorySchema,
  "enquiriesHistory"
);
