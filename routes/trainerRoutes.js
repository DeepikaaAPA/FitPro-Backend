const express = require("express");
const trainerController = require("../controllers/trainerController");
const auth = require("../utils/auth");
const uploadDp = require("../utils/uploadDp");
const trainerRouter = express.Router();

trainerRouter.post(
  "/postApplication",
  auth.verifyToken,
  trainerController.postApplication
);
trainerRouter.get("/:id", auth.verifyToken, trainerController.getTrainer);
trainerRouter.post("/:id", auth.verifyToken, trainerController.updateTrainer);
trainerRouter.post(
  "/dp/:id",
  auth.verifyToken,
  uploadDp.single("profilePic"),
  trainerController.updateDp
);
//trainerRouter.post("/:id", auth.verifyToken, trainerController.updateImages);
module.exports = trainerRouter;
