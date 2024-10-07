const User = require("../models/user");
const Enquiry = require("../models/admin/enquiry");
const Booking = require("../models/trainer/booking");

const mongoose = require('mongoose');

const Review = require('../models/review');
// create a controller object with all the methods that will be used in the routes
const userController = {
  getUser: async (req, res) => {
    try {
      // get the user id from the request object
      const userId = req.userId;

      // get the user from the database
      const user = await User.findById(userId).select(
        "-password -__v -created_at -updated_at -_id"
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // send the user object as response
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  putUser: async (req, res) => {
    try {
      const { name } = req.body;

      const userId = req.userId;

      const user = await User.findById(userId);

      user.name = name;
      user.updated_at = Date.now();

      await user.save();

      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const userId = req.userId;

      await User.findByIdAndDelete(userId);

      res.clearCookie("token").json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  addEnquiry: async (req, res) => {
    try {
      const { firstname, lastname, email, phone, query } = req.body;

      const newEnquiry = new Enquiry({
        firstname,
        lastname,
        email,
        phone,
        query,
      });
      await newEnquiry.save();
      res.status(200).json({ message: "We will contact you shortly." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  getBookings: async (req, res) => {
    try {
      const userId = req.userId;
      const bookings = await Booking.find({ userId })
        .sort({ bookedDate: 1, bookedSlot: 1 }) // 1 for ascending order, -1 for descending order
        .exec();
      res.json({ bookings });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  getUpcoming: async (req, res) => {
    try {
      const userId = req.userId;
      const bookings = await Booking.find({
        userId,
        bookedDate: { $gte: new Date(new Date().toLocaleDateString()) },
      })
        .sort({ bookedDate: 1, bookedSlot: 1 }) // 1 for ascending order, -1 for descending order
        .exec();
      res.json({ bookings });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  getPast: async (req, res) => {
    try {
      const userId = req.userId;
      const bookings = await Booking.find({
        userId,
        bookedDate: { $lt: new Date(new Date().toLocaleDateString()) },
      });
      res.json({ bookings });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  cancel: async (req, res) => {
    try {
      const id = req.params.id;
      await Booking.findByIdAndDelete(id);
      res.send("Cancelled.");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  getTrainersReviews:async (req, res) => {
    try {
      const userId=req.userId;
      const bookings = await Booking.find({userId,bookedDate:{$lt:new Date(new Date().toLocaleDateString())}})
      
      const trainers=new Set( bookings.map(doc=> doc.trainerId))
      console.log(trainers)
      const results=[]
      for(const trainer of trainers){
       results.push( bookings.find(booking=>booking.trainerId===trainer))
      }
   
      console.log(results)
      res.json(results)
    } catch (error) {
      console.error('Error fetching trainer ratings and reviews:', error);
      res.status(500).send("internal server error")
    }
  }
};




// export the controller
module.exports = userController;
