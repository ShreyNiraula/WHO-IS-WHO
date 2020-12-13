var createError = require("http-errors");
var express = require("express");
var path = require("path");
var db = require("./connections");

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var centralgovRouter = require("./routes/HomePage/centralgov");
var ministerRouter = require("./routes/Ministry/ministers");
var userRouter = require("./routes/Admin/admin");
var addRouter = require("./routes/PositionCRUD/add");
var updateRouter = require("./routes/PositionCRUD/update");
var deleteRouter = require("./routes/PositionCRUD/delete");
const { query } = require("express");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
const urlEncodedParser = bodyParser.urlencoded({ extended: false });
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", centralgovRouter);
app.use('/admin', userRouter)
app.use("/minister", ministerRouter);
app.use("/add", addRouter);
app.use("/update", updateRouter);
app.use("/delete", deleteRouter);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
