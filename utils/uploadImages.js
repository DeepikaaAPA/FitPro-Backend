const multer = require("multer");
const path = require("path");
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/");
  },
  filename: function (req, file, cb) {
    cb(null, req.userId + "_" + file.originalname);
  },
});

const uploadImages = multer({ storage });
module.exports = uploadImages;
