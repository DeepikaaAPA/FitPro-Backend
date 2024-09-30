const multer = require("multer");
const path = require("path");
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, req.userId + "_video" + path.extname(file.originalname));
  },
});

const uploadVideo = multer({ storage });
module.exports = uploadVideo;
