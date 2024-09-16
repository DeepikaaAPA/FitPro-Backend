const Enquiry = require("../models/enquiry");

const adminController = {
  getEnquiries: async (req, res) => {
    try {
      const results = await Enquiry.find();
      console.log("enquiries", results);
      return res.status(200).json(results);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
    }
  },
  deleteEnquiry: async (req, res) => {
    const enquiryId = req.body.enquiryId;
    try {
      await Enquiry.deleteOne({ _id: enquiryId });
      return res.status(200).json({ message: "Enquiry Closed." });
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: "Error closing the enquiry." });
    }
  },
};
module.exports = adminController;
