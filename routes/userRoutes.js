// import express
const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../utils/auth");

// create a router
const userRouter = express.Router();

// define the routes
// protected routes, only authenticated users can access
userRouter.post("/enquiry", userController.addEnquiry);
userRouter.get("/", auth.verifyToken, userController.getUser);
userRouter.put("/", auth.verifyToken, userController.putUser);
userRouter.delete("/", auth.verifyToken, userController.deleteUser);
userRouter.delete("/cancel/:id", auth.verifyToken, userController.cancel);
userRouter.get("/getBookings", auth.verifyToken, userController.getUser);
userRouter.get("/getUpcoming", auth.verifyToken, userController.getUpcoming);

// export the router
module.exports = userRouter;
