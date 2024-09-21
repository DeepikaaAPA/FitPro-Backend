// import the express module
const express = require("express");
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routes/adminRoutes");

const cors = require("cors");
const { FORNTEND_LINK } = require("./utils/config");
const trainerRouter = require("./routes/trainerRoutes");
// create a new express app
const app = express();

// use the cors middleware
app.use(
  cors({
    origin: FORNTEND_LINK,
    credentials: true,
  })
);

// use the express json middleware for parsing json data
app.use(express.json());

// use the cookie parser middleware
app.use(cookieParser());

// use the routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/trainer", trainerRouter);

// export the app
module.exports = app;
