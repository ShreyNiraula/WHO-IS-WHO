var express = require("express");
const router = express.Router();
var db = require("../connections");

router.get("/:id", (req, res, next) => {
  const { id } = req.params; // rename the id as Ministry_id
  // here, '${id}' is needed, to make string for sql command itself
  let sql = `SELECT * FROM Ministry JOIN Position on Position.Ministry_id= Ministry.Ministry_id where Ministry.Ministry_id='${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log("single minister", result);
    res.render("minister", { result: result });
  });
});

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
