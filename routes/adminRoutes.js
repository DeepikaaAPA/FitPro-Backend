// import express
const express = require("express");
const adminController = require("../controllers/adminController");
const auth = require("../utils/auth");

// create a router
const adminRouter = express.Router();

// define the routes
// protected routes, only authenticated users can access
adminRouter.get(
  "/getEnquiries",
  auth.verifyToken,
  auth.isAdmin,
  adminController.getEnquiries
);
adminRouter.delete(
  "/closeEnquiry/:id",
  auth.verifyToken,
  auth.isAdmin,
  adminController.closeEnquiry
);
adminRouter.get(
  "/getApplications",
  auth.verifyToken,
  auth.isAdmin,
  adminController.getApplications
);
adminRouter.post(
  "/approveTrainer/:id",
  auth.verifyToken,
  auth.isAdmin,
  adminController.approveTrainer
);
adminRouter.post(
  "/rejectTrainer/:id",
  auth.verifyToken,
  auth.isAdmin,
  adminController.rejectTrainer
);
// export the router
module.exports = adminRouter;
