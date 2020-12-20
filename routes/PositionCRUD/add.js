var express = require("express");
const router = express.Router();
var db = require("../../connections");
var bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const { v4: uuidv4 } = require('uuid');



// route for adding new candidate
// nested db querying 
router.get("/:id", (req, res, next) => {
    const { id } = req.params;
    const sql1 = "SELECT DISTINCT Department FROM Position";   // distinct Departments for selection 
    const sql2 = "SELECT DISTINCT Position FROM Position";
  
    let departments = [];
    let positions = [];
  
    db.query(sql1, (err, departments) => {
      if (err) throw err;
      departments = departments;
  
      db.query(sql2, (err, positions) => {
        if (err) throw err;
        positions = positions;
        res.render("addForm", {
          id: id,
          departments: departments,
          positions: positions,
        });
      });
    });
  });


// route to post added candidate and redirect to minister page
router.post("/:id", urlEncodedParser, (req, res, next) => {
    const { id } = req.params;
    const {
      First_Name,
      Middle_Name,
      Last_Name,
      Initials,
      Position,
      Department,
      Photo_URL,
    } = req.body;

  
    let sql1 = `SELECT Candidate_id FROM Candidate ORDER BY Candidate_id DESC LIMIT 1`
    db.query(sql1, (err, highestId) => {
      if (err) throw err;

      const latestId = highestId[0].Candidate_id  // string
      const newId = Number(latestId)+1

      let sql2 = `INSERT INTO Candidate (Candidate_id, Initials, First_Name, Middle_Name, Last_Name, Photo_URL) VALUES ('${newId}','${Initials}','${First_Name}', '${Middle_Name}', '${Last_Name}', '${Photo_URL}')`;

      db.query(sql2, (err, result)=>{
        if (err) throw err;
        var sql3_data  = {Ministry_id:id, Position: Position, Department:Department, Candidate_id:newId };
        let sql3 = `INSERT INTO Position SET ?`
        db.query(sql3, sql3_data, (err, result)=>{
          if (err) throw err;
          res.redirect(`/minister/${id}`); // redirect
        })
      })
     
    });
});

module.exports = router;
