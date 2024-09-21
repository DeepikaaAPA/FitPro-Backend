const Application = require("../models/application");

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
        discipline,
        experience,
        appliedOn: new Date(),
      });
      await newApplication.save();
      return res.status(200).json({
        message:
          "Application submitted. We will contact you wihin 10 business days.",
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};
module.exports = trainerController;
