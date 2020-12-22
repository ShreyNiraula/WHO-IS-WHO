var express = require("express");
const router = express.Router();
var db = require("../../connections");

router.get("/", (req, res, next) => {

  // TODO: all info or only selective info from minister table
  let sql = "SELECT * FROM Ministry ORDER BY Ministry DESC"; // all the minister table info
  db.query(sql, (err, result) => {
    // console.log("the obtained response from the ministry table is", result);
    if (err) throw err;
    res.render("central", { result: result });
  });
});

module.exports = router;
