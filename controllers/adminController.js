const Enquiry = require("../models/admin/enquiry");
const EnquiryHistory = require("../models/admin/enquiryHistory");
const Application = require("../models/trainer/application");
const Trainer = require("../models/trainer/Trainer");
const User = require("../models/user");
const RejectedApplicaiton = require("../models/trainer/rejectedApplication");
const adminController = {
  getEnquiries: async (req, res) => {
    try {
      const results = await Enquiry.find();
      // console.log("enquiries", results);
      return res.status(200).json(results);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  closeEnquiry: async (req, res) => {
    const enquiryId = req.params.id;
    try {
      const { _id, email, firstname, lastname, phone, query, enquiredOn } =
        await Enquiry.findById({ _id: enquiryId });
      console.log("result", {
        _id,
        email,
        firstname,
        lastname,
        phone,
        query,
        enquiredOn,
        closedOn: new Date(),
      });
      await EnquiryHistory.insertMany({
        _id,
        email,
        firstname,
        lastname,
        phone,
        query,
        enquiredOn,

        closedOn: new Date(),
      });
      await Enquiry.deleteOne({ _id: enquiryId });
      return res.status(200).json({ message: "Enquiry Closed." });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Error closing the enquiry." });
    }
  },
  getApplications: async (req, res) => {
    try {
      const results = await Application.find();
      return res.status(200).json(results);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  approveTrainer: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await Application.findById(id);
      if (!result) return res.status(400).json({ message: "invalid id" });
      const {
        email,
        phone,
        firstname,
        lastname,
        discipline,
        experience,
        appliedOn,
        userId,
      } = result;
      const trainer = new Trainer({
        userId,
        email,
        phone,
        firstname,
        lastname,
        discipline,
        experience,
        appliedOn,
      });
      await trainer.save();
      await Application.deleteOne({ _id: id });

      await User.updateOne(
        { _id: userId },
        {
          $set: {
            role: "trainer",
          },
        }
      );
      return res.status(200).json({ message: "Trainer approved." });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
  rejectTrainer: async (req, res) => {
    try {
      const id = req.params.id;
      const reason = req.body.reason;
      const result = await Application.findById(id);

      if (!result) return res.status(400).json({ message: "invalid id" });
      const {
        email,
        phone,
        firstname,
        lastname,
        discipline,
        experience,
        appliedOn,
      } = result;
      const rejection = new RejectedApplicaiton({
        userId: id,
        email,
        phone,
        firstname,
        lastname,
        discipline,
        experience,
        reason,
        appliedOn,
      });
      await rejection.save();
      await Application.deleteOne({ _id: id });
      return res.status(200).json({ message: "Trainer rejected." });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },
};
module.exports = adminController;
