var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
const passport = require("passport");
var app = express();
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

const { errorHandler, notFound } = require("./middlewares/error");

// Security Headers (helmet)
app.use(helmet());

// Prevent Http Param Pollution
app.use(hpp());

// Prevent XSS(Cross Site Scripting) Attacks
app.use(xss());





//* Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/api", indexRouter);
//* passport
app.use(passport.initialize());
require("./middlewares/passport")(passport);


// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);


//* connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err));




module.exports = app;
