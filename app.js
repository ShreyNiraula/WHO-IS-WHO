var createError = require("http-errors");
var express = require("express");
var path = require("path");
var db = require("./connections");

var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();

var centralgovRouter = require("./routes/centralgov");
var ministerRouter = require("./routes/ministers");
var addRouter = require("./routes/add");
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

// app.use("/", indexRouter);
// app.use("/states", stategovRouter);
app.use("/", centralgovRouter);
app.use("/minister", ministerRouter);
// app.use("/add", addRouter);

// route end point for adding new data
// eg: /add/MOHP
app.get("/add/:id", (req, res, next) => {
  const { id } = req.params;
  res.render("addForm", { id: id });
});

// update the candidate value in minister under certain position
// eg: update / MOHP / secretary;
app.get("/update/:id/:pid", (req, res, next) => {
  const query = req.query;
  const { id, pid } = req.params;
  res.render("updateForm", { id: id, pid: pid, query: query });
});

app.post("/added/:id", urlEncodedParser, (req, res, next) => {
  const { id, pid } = req.params;
  const {
    First_Name,
    Middle_Name,
    Last_Name,
    Department,
    Salary,
    Photo_URL,
  } = req.body;

  let sql = `INSERT INTO Candidate (Candidate_id, First_Name, Middle_Name, Last_Name, Photo_URL)
  VALUES ('${First_Name}', '${Middle_Name}', '${Last_Name}', '${Photo_URL}');
  `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("added Minister", result);
    res.redirect(`/minister/${id}`); // redirect
  });
});

app.post("/updated/:id/:pid/:cid", urlEncodedParser, (req, res, next) => {
  const { id, pid, cid } = req.params;
  console.log("the cidis:", cid);
  const {
    Candidate_id,
    Initials,
    First_Name,
    Middle_Name,
    Last_Name,
    Department,
    Salary,
    Photo_URL,
  } = req.body;
  let sql = `UPDATE Candidate as c NATURAL JOIN Position as p NATURAL JOIN Designation as d SET c.Candidate_id=${cid}, c.Initials='${Initials}', c.First_Name='${First_Name}', c.Middle_Name='${Middle_Name}', c.Last_Name='${Last_Name}', c.Photo_URL='${Photo_URL}', p.Ministry_id='${id}', p.Position='${pid}', p.Department ='${Department}',  d.Salary='${Salary}'  WHERE p.Ministry_id = '${id}' AND p.Position='${pid}'`;

  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Updated Minister", result);
    res.redirect(`/minister/${id}`); // redirect
  });
});

app.get("/delete/:id/:pid", (req, res, next) => {
  const { id, pid } = req.params;
  let sql = `DELETE c,p FROM Candidate as c 
  NATURAL JOIN Position as p 
  NATURAL JOIN Designation as d 
  WHERE p.Ministry_id = '${id}' AND p.Position='${pid}';
  `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.redirect(`/minister/${id}`); // redirect
  });
});

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
