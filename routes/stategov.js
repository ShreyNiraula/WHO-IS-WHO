var express = require("express");
const router = express.Router();
var db = require("../connections");

// route for listing all states(provinces)
router.get("/", (req, res, next) => {
  let sql = "SELECT Province_Name from Province";
  db.query(sql, (err, result) => {
    if (err) throw err;
    // console.log(result);
    // res.send(result);
    [{ province_name: "bagmati" }, {}, {}];
    provinces = [];
    result.forEach((prov) => {
      provinces.push(prov["Province_Name"]);
    });
    // res.json(provinces);
    res.render("states", { data: { provinces: provinces } });
  });
});

// router.get("/");
module.exports = router;
