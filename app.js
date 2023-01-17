const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongodb = require("./db/mongo");

require("dotenv").config();

mongodb.initClientDbConnection();

const indexRouter = require("./routes/index");

const app = express();

app.use(
  cors({
    exposedHeaders: ["authorization"],
    origin: "http://localhost:3001",
  })
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/v1", indexRouter);

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err,
  });
});

module.exports = app;
