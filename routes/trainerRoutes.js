const express = require("express");
const trainerController = require("../controllers/trainerController");
const auth = require("../utils/auth");
const uploadDp = require("../utils/uploadDp");
const uploadImages = require("../utils/uploadImages");
const uploadVideo = require("../utils/uploadVideo");
const trainerRouter = express.Router();

trainerRouter.post(
  "/postApplication",
  auth.verifyToken,
  trainerController.postApplication
);
trainerRouter.get("/get/:id", trainerController.getTrainer);
trainerRouter.get("/all", trainerController.getAll);
trainerRouter.post("/search", trainerController.search);
trainerRouter.post("/update/:id", auth.verifyToken, trainerController.updateTrainer);
trainerRouter.post("/book", auth.verifyToken, trainerController.book);
trainerRouter.post(
  "/dp/:id",
  auth.verifyToken,
  uploadDp.single("profilePic"),
  trainerController.updateDp
);
trainerRouter.post(
  "/video/:id",
  auth.verifyToken,
  uploadVideo.single("video"),
  trainerController.updateVideo
);
trainerRouter.post(
  "/images/:id",
  auth.verifyToken,
  uploadImages.array("images", 10),
  trainerController.updateImages
);
trainerRouter.get(
  "/slots",
  auth.verifyToken,
  trainerController.getAvailableSlots
);
trainerRouter.get(
  "/bookings/:id",
  auth.verifyToken,
  trainerController.getBookings
);
module.exports = trainerRouter;
