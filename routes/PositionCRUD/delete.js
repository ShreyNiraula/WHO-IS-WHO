var express = require("express");
const router = express.Router();
var db = require("../../connections");


// delete specific position
// delete cause cascade delete to position table as well.
router.get("/:id/:pid", (req, res, next) => {
    const { id, pid } = req.params;
    const {cid} = req.query;
      // go for simple delete
      let sql = `DELETE c,p FROM Candidate as c 
      NATURAL JOIN Position as p 
      NATURAL JOIN Designation as d 
      WHERE p.Ministry_id = '${id}' AND p.Position='${pid}';
      `;
      db.query(sql, (err, result) => {
        console.log('the deleted result is:', result) // useless info
        if (err) throw err;
        res.redirect(`/minister/${id}`); // redirect
      });
  });
module.exports = router;

  