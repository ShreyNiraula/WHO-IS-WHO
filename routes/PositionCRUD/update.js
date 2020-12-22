var express = require("express");
const router = express.Router();
var db = require("../../connections");
var bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });



// update the candidate value in minister under certain position
// eg: update / MOHP / secretary;
router.get("/:id/:pid", (req, res, next) => {
    const query = req.query;
    const { id, pid } = req.params;
  
    let sql = "SELECT DISTINCT Department FROM Position"; // extract the total distinct department names
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.render("updateForm", {
        id: id,
        pid: pid,
        query: query,
        departments: result,
      });
    });
  });
  
// route to post the updated content and redirect to minister page
router.post("/:id/:pid/:cid", urlEncodedParser, (req, res, next) => {
    const { id, pid, cid } = req.params;
    const {
      Initials,
      First_Name,
      Middle_Name,
      Last_Name,
      Department,
      Salary,
      Photo_URL,
    } = req.body;

    // update both candidate table that causes update cascade to position table as well.
    let sql = `UPDATE Candidate as c NATURAL JOIN Position as p NATURAL JOIN Designation as d SET c.Candidate_id=${cid}, c.Initials='${Initials}', c.First_Name='${First_Name}', c.Middle_Name='${Middle_Name}', c.Last_Name='${Last_Name}', c.Photo_URL='${Photo_URL}', p.Ministry_id='${id}', p.Position='${pid}', p.Department ='${Department}'  WHERE p.Ministry_id = '${id}' AND p.Position='${pid}'`;
    db.query(sql, (err, result) => {
      if (err) throw err;
      res.redirect(`/minister/${id}`); 
    });
  });
module.exports = router;
