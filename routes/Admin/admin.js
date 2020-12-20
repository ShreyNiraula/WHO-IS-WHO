var express = require("express");
const router = express.Router();
var db = require("../../connections");
var bodyParser = require("body-parser");
const urlEncodedParser = bodyParser.urlencoded({ extended: false });


// admin login route
router.get('/', (req,res, next)=>{
    res.render('login');
})
  
// after login action
router.post('/', urlEncodedParser,(req,res, next)=>{
    const {AdminPwd} = req.body
    
    let sql = 'SELECT password FROM Admin'   // retrive pwd
    db.query(sql, (err, result)=>{
        if(err) throw err 
        // if password matches, set isLogged true 
        if(AdminPwd === result[0].password){
            let sql2 = `UPDATE Admin SET isLogged=true WHERE password ='${result[0].password}'`  // update isLogged in db
            db.query(sql2, (err, success)=>{
                if(err) throw err
                res.redirect('/')
            })
        }
        else{
            // if password does not match
            
            res.redirect('/')
        }
    })
})


// logout action
router.post('/logout',urlEncodedParser, (req,res)=>{
    db.query(`UPDATE Admin SET isLogged=false`, (err, success)=>{
        if(err) throw err
        res.redirect('/')
    })
})
module.exports = router;