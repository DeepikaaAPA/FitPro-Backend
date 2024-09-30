const multer = require("multer");
const path = require('path');
// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/dp/");
  },
  filename: function (req, file, cb) {
    cb(null, req.userId + "_dp"+ path.extname(file.originalname));
  },
});

const uploadDp = multer({ storage });
module.exports = uploadDp;
