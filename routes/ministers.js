var express = require("express");
const router = express.Router();
var db = require("../connections");
var bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

// router.get("/:id", (req, res, next) => {
//   const { id } = req.params; // rename the id as Ministry_id
//   // here, '${id}' is needed, to make string for sql command itself
//   // let sql = `SELECT * FROM Ministry JOIN Position on Position.Ministry_id= Ministry.Ministry_id where Ministry.Ministry_id='${id}'`;
//   let sql = `SELECT *, CONCAT_WS(" ",Candidate.First_Name, Candidate.Middle_Name, Candidate.Last_Name) as FullName FROM Ministry JOIN Position ON Position.Ministry_id= Ministry.Ministry_id JOIN Candidate ON Position.Candidate_id = Candidate.Candidate_id WHERE Ministry.Ministry_id='${id}'`;
//   db.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("single minister", result);
//     res.render("minister", { result: result });
//   });
// });
router.get("/:id", (req, res, next) => {
  const { id } = req.params; // rename the id as Ministry_id
  // here, '${id}' is needed, to make string for sql command itself
  // let sql = `SELECT * FROM Ministry JOIN Position on Position.Ministry_id= Ministry.Ministry_id where Ministry.Ministry_id='${id}'`;
  let sql = `SELECT * FROM Candidate NATURAL JOIN Position Natural Join Designation where Position.Ministry_id = '${id}' order by Designation.Hierarchy asc`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("single minister", result);
    res.render("minister", { result: result });
  });
});

router.post("/:id", urlEncodedParser, (req, res, next) => {
  console.log("the reponse body must contain the form values", req.body);

  if (req.body.position === undefined) {
    // case for PUT, (UPDATE case)
    // TODO: respective sql for put method....
    console.log("put was done");
  } else {
    // case for POST, (ADD case)
    // TODO: respective sql for post method
    console.log("post was done");
  }
});

// updated content
// router.post("/:id", urlEncodedParser, (req, res, next) => {
//   console.log("the ", req.body);
// });

router.get("/:id/position/:pid", (req, res, next) => {
  console.log("the req params in double case", req.params);
  const { id, pid } = req.params; // rename the id as Ministry_id

  let sql = `SELECT CONCAT_WS(" ",First_Name, Middle_Name, Last_Name) as FullName, Photo_URL 
  from Candidate Natural Join Position
  WHERE Position = '${pid}' and Ministry_id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("candidate", result);
    res.render("candidate", { result: result });
  });
});
module.exports = router;
