const express = require("express");
const trainerController = require("../controllers/trainerController");
const auth = require("../utils/auth");

const trainerRouter = express.Router();

trainerRouter.post(
  "/postApplication",
  auth.verifyToken,
  trainerController.postApplication
);

module.exports = trainerRouter;
