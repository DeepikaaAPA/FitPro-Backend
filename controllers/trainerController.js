const Application = require("../models/trainer/application");
const Trainer = require("../models/trainer/Trainer");
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
      console.log("userId: ", userId);
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
  updateDp: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No files were uploaded.");
      }
      console.log(req.file);
      return res.send("File uploaded successfully.");
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateTrainer: async (req, res) => {
    try {
      const userId = req.params.id;

      // const {
      //   phone,
      //   firstname,
      //   lastname,

      //   experience,

      //   disciplines,

      //   description,
      //   images,
      //   profilePic,
      //   video,
      //   price,
      //   languages,
      //   awards,
      //   qualifications,
      // } = req.body;
      return res.json({ message: "done" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = trainerController;
