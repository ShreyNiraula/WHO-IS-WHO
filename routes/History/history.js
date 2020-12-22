var express = require("express");
const router = express.Router();
var db = require("../../connections");

router.get('/:id', (req, res, next)=>{
    const {id} = req.params;

    const sql1 = `SELECT Ministry FROM Ministry WHERE Ministry_id='${id}'`
    db.query(sql1, (err, ministryName)=>{
      if(err) throw err;

      const sql = `SELECT * FROM Candidate AS c NATURAL JOIN Former_Ministers AS f WHERE f.Ministry_id='${id}'`
      db.query(sql, (err, result)=>{
          if(err) throw err;
          console.log('the result', result)
          result.sort(function(a,b) {
              a = a.In_Office_Since.split('-').join('');
              b = b.In_Office_Since.split('-').join('');
              return b > a ? 1 : b< a ? -1 : 0;
              // return a.localeCompare(b);         // <-- alternative 
            });
          console.log('after sorting', result)

          res.render('history', {histories: result, id:id, ministryName:ministryName}, )
      })
    })
  })
module.exports = router;



