var express = require("express");
const router = express.Router();
var db = require("../../connections");
var bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });



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
    const { id, pid } = req.params;
    const {
        Initials,
        First_Name,
        Middle_Name,
        Last_Name,
        Department,
        Salary,
        Photo_URL,
    } = req.body;

    // TODO: incomplete
    let sql = `INSERT INTO Candidate (Initials,First_Name, Middle_Name, Last_Name, Photo_URL)
    VALUES ('${Initials}','${First_Name}', '${Middle_Name}', '${Last_Name}', '${Photo_URL}');
    `;

    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect(`/minister/${id}`); // redirect
    });
});

module.exports = router;
