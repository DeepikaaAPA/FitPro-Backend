const Enquiry = require("../models/enquiry");
const EnquiryHistory = require("../models/enquiryHistory");

const adminController = {
  getEnquiries: async (req, res) => {
    try {
      const results = await Enquiry.find();
      // console.log("enquiries", results);
      return res.status(200).json(results);
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ message: error.message });
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
      res.status(400).json({ message: "Error closing the enquiry." });
    }
  },
};
module.exports = adminController;
