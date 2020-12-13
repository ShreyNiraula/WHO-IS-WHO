var express = require("express");
const router = express.Router();
var db = require("../../connections");

router.get('/candidate/:cid', (req, res, next)=>{
    const {cid} = req.params;
    res.render('candidate')
  })
module.exports = router;
