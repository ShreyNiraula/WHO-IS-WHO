var express = require("express");
const router = express.Router();
var db = require("../../connections");
var bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });


// route to specific ministry
router.get("/:id", (req, res, next) => {
  const { id } = req.params; 

  let sql1 = 'SELECT isLogged FROM Admin';
  db.query(sql1, (err, isLogged)=>{
    if(err) throw err;

    let sql2 = `SELECT Ministry, URL, Established_Date FROM Ministry where Ministry_id='${id}'`
    db.query(sql2, (err, ministryInfo)=>{
      if (err) throw err;
      
      // select candidate info from all table by joining
      let sql3 = `SELECT * FROM Candidate NATURAL JOIN Position Natural Join Designation where Position.Ministry_id = '${id}' order by Designation.Hierarchy asc`;
      db.query(sql3, (err, result) => {
        if (err) throw err;
        res.render("minister", { result: result, ministryInfo: ministryInfo, isLogged: isLogged });
    });
    })

  })
});



// route for specific position in ministry
router.get("/:id/position/:pid", (req, res, next) => {
  const { id, pid } = req.params; // rename the id as Ministry_id
  
  let sql = `SELECT CONCAT_WS(" ",First_Name, Middle_Name, Last_Name) as FullName, Photo_URL 
  from Candidate Natural Join Position
  WHERE Position = '${pid}' and Ministry_id = '${id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.render("candidate", { result: result });
  });
});
module.exports = router;
