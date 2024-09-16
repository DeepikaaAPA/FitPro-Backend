// import mongoose
const mongoose = require("mongoose");
/** 
token => random string generated using email for password reset
useBefore = > for password reset token
activateToken = > a/c activation token
*/

// create  a new schema
const enquirySchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  phone: Number,
  query: String,
  enquiredOn: {
    type: Date,
    default: Date.now,
  },
});

// create a new model and export it
module.exports = mongoose.model("Enquiry", enquirySchema, "enquiries");
