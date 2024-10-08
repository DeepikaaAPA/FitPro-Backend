// import mongoose
const mongoose = require("mongoose");
/** 
token => random string generated using email for password reset
useBefore = > for password reset token
activateToken = > a/c activation token
*/

// create  a new schema
const userSchema = new mongoose.Schema({
  email: String,
  firstname: String,
  lastname: String,
  password: String,
  phone: Number,
  role: {
    type: String,
    enum: ["admin", "user", "trainer"],
    default: "user",
  },
  activateToken: { type: String, default: null },
  activateBefore: { type: Date, default: null },
  activationStatus: { type: String, default: "inactive" },
  token: {
    type: String,
    default: null,
  },
  useBefore: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// create a new model and export it
module.exports = mongoose.model("User", userSchema, "users");
