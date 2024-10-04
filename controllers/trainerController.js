const Application = require("../models/trainer/application");
const Trainer = require("../models/trainer/Trainer");
const Booking = require("../models/trainer/booking");
const path = require("path");
const trainerController = {
  postApplication: async (req, res) => {
    try {
      const {
        firstname,
        lastname,
        phone,
        email,
        userId,
        discipline,
        experience,
      } = req.body;
      const newApplication = new Application({
        firstname,
        lastname,
        phone,
        email,
        userId,
        disciplines: [discipline],
        experience,
        appliedOn: new Date(),
      });

      await newApplication.save();
      return res.status(200).json({
        message:
          "Application submitted. We will contact you within 10 business days.",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getTrainer: async (req, res) => {
    try {
      const userId = req.params.id;
      const result = await Trainer.findOne({ userId });
      if (!result) {
        return res.status(400).json({ message: "Invalid ID" });
      }
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const results = await Trainer.find();
      return res.json(results);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  search: async (req, res) => {
    try {
      const { filters } = req.body;
      const search = {
        languages: { $regex: filters.language || "", $options: "i" },
        price: { $lte: filters.price },
      };
      const filterDisciplines = [];
      if (filters.Yoga) filterDisciplines.push("Yoga");
      if (filters.Zumba) filterDisciplines.push("Zumba");
      if (filters.Pilates) filterDisciplines.push("Pilates");
      if (filters["Postpartum Fitness"])
        filterDisciplines.push("Postpartum Fitness");
      if (filters.Cardio) filterDisciplines.push("Cardio");
      if (filters.Aerobics) filterDisciplines.push("Aerobics");
      if (filters["Strength Training"])
        filterDisciplines.push("StrengthTraining");

      if (!filters.all) search.disciplines = { $in: filterDisciplines };
      if (filters.query !== "") {
        const searchWords = filters.query
          .split(" ")
          .map((word) => new RegExp(word, "i"));
        search.$or = [
          { firstname: { $in: searchWords } },
          { lastname: { $in: searchWords } },
          { description: { $in: searchWords } },
          { disciplines: { $in: searchWords } },
        ];
      }
      const results = await Trainer.find(search);
      return res.json(results);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  updateDp: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(200).send("No new dp uploaded.");
      }

      const userId = req.userId;

      await Trainer.updateOne(
        { userId },
        { $set: { profilePic: req.file.path } }
      );
      return res.send(req.file.path);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateImages: async (req, res) => {
    try {
      if (!req.files) {
        return res.status(200).send("No new images uploaded.");
      }

      const userId = req.userId;

      await Trainer.updateOne(
        { userId },
        { $set: { images: req.files.map((file) => file.path) } }
      );
      return res.send(req.files.length + " images uploaded successfully.");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateVideo: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(200).send("No new video uploaded.");
      }

      const userId = req.userId;

      await Trainer.updateOne({ userId }, { $set: { video: req.file.path } });
      return res.send("Video uploaded");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateTrainer: async (req, res) => {
    try {
      const userId = req.userId;

      const {
        phone,
        firstname,
        lastname,
        experience,
        disciplines,
        description,
        price,
        languages,
        awards,
        qualifications,
      } = req.body;
      await Trainer.updateOne(
        { userId },
        {
          $set: {
            phone,
            firstname,
            lastname,
            experience,
            disciplines,
            description,
            price,
            languages,
            awards,
            qualifications,
          },
        }
      );
      return res.json({ message: "Trainer account updated." });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  getAvailableSlots: async (req, res) => {
    try {
      const { date, trainerId } = req.query;

      const results = await Booking.find({ trainerId, bookedDate: date });
      const bookedSlots = results.map((doc) => doc.bookedSlot);
      const allSlots = [
        "06:00 am",
        "07:00 am",
        "08:00 am",
        "09:00 am",
        "10:00 am",
        "11:00 am",
        "02:00 pm",
        "03:00 pm",
        "04:00 pm",
        "05:00 pm",
        "06:00 pm",
      ];
      const availableSlots = allSlots.filter(
        (slot) => !bookedSlots.includes(slot)
      );
      res.send(availableSlots);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  book: async (req, res) => {
    try {
      const userId = req.userId;
      const { cart } = req.body;
      cart.forEach((item) => {
        const i = item;
        item.selectedSlots.forEach(async (slot) => {
          const newBooking = new Booking({
            userId,
            user: i.user,
            bookedDate: new Date(i.selectedDate),
            bookedSlot: slot,
            trainerId: i.trainerId,
            trainer: i.trainer,
          });
          await newBooking.save();
          console.log("slot", slot);
        });
      });
      res.send("Booked successfully.");
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
  getBookings: async (req, res) => {
    try {
      const trainerId = req.params.id;
      const bookings = await Booking.find({ trainerId });
      res.json({ bookings });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = trainerController;
