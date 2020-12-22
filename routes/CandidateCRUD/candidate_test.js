var express = require("express");
const router = express.Router();
var db = require("../../connections");

router.get('/:cid', (req, res, next)=>{
    const {cid} = req.params;

    // simply get the candidate info from all other tables joined
    const sql = `SELECT * FROM Candidate WHERE c.Candidate_id=${cid}`
    db.query(sql, (err, candidateInfo)=>{
      if(err) throw err;
      console.log('the candidate info ', candidateInfo)

      const sql2 = `SELECT Ministry_id, In_Office_Since, Left_Office FROM Candidate AS c NATURAL JOIN Former_Ministers WHERE c.Candidate_id = ${cid}`
      db.query(sql2, (err, historyInfo)=>{
        if(err) throw err;
        // sort the history info according to descending date
        historyInfo.sort(function(a,b) {
          a = a.In_Office_Since.split('-').join('');
          b = b.In_Office_Since.split('-').join('');
          return b > a ? 1 : b< a ? -1 : 0;
          // return a.localeCompare(b);         // <-- alternative 
        });
        console.log('the historyInfo', historyInfo)
        res.render('candidate', {candidateInfo:candidateInfo, historyInfo:historyInfo})
      })

      
    })
  })
module.exports = router;
