const User = require("../models/user");
const Enquiry = require("../models/admin/enquiry");
const Booking = require("../models/trainer/booking");
const Trainer = require("../models/trainer/Trainer");
const mongoose = require("mongoose");

const Review = require("../models/review");
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
  getAllBookings: async (req, res) => {
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
  getTrainersReviews: async (req, res) => {
    try {
      const userId = req.userId;
      const bookings = await Booking.find({
        userId,
        bookedDate: { $lt: new Date(new Date().toLocaleDateString()) },
      });
      console.log(bookings);
      const trainers = await Booking.distinct("trainerId", {
        userId,
        bookedDate: { $lt: new Date(new Date().toLocaleDateString()) },
      });

      //console.log("trainers", trainers);
      const results = [];
      for (let t of trainers) {
        const trainer = await Trainer.findOne({ userId: t });
        const review = await Review.findOne({ userId, trainerId: t });
        results.push({
          userId,
          trainerId: t,
          trainer,
          review: review?.review,
          rating: review?.rating,
        });
      }
      //console.log("results :", results);
      res.json(results);
    } catch (error) {
      console.error("Error fetching trainer ratings and reviews:", error);
      res.status(500).send(error.message);
    }
  },
  postReview: async (req, res) => {
    try {
      const { trainer, trainerId, userId, user, rating, review } = req.body;

      const results = await Review.findOne({ userId, trainerId });
      console.log(results);
      if (!results) {
        const newReview = new Review({
          trainer,
          trainerId,
          userId,
          user,
          rating,
          review,
        });
        await newReview.save();
      } else {
        await Review.updateOne(
          { userId, trainerId },
          { $set: { review, rating } }
        );
      }
      const reviews = await Review.find({ trainerId });
      let totalRating = 0;
      for (const r of reviews) {
        totalRating += r.rating;
      }
      const avgRating = totalRating / reviews.length;
      await Trainer.updateOne({ userId: trainerId }, { $set: { avgRating } });
      res.send("Review saved.");
    } catch (error) {
      console.error("Error posting trainer ratings and reviews:", error);
      res.status(500).send(error.message);
    }
  },
};
// export the controller
module.exports = userController;
