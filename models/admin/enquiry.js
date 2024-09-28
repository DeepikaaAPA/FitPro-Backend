// import mongoose
const mongoose = require("mongoose");

// create  a new schema
const enquirySchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  phone: String,
  query: String,
  enquiredOn: {
    type: Date,
    default: Date.now,
  },
});

// create a new model and export it
module.exports = mongoose.model("Enquiry", enquirySchema, "enquiries");
