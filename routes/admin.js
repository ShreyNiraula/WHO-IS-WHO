var express = require("express");
const router = express.Router();
var db = require("../connections");

//login page
router.get('/', (req,res)=>{
    res.render('login');
})
//register page
router.get('/register', (req,res)=>{
    res.render('register');
})


router.post('/', (req,res)=>{
    const {Password} = req.body

    let sql = 'SELECT password FROM admin'
    db.query(sql, (err, result)=>{
        if(err) throw err 

        if(Password === result[0].password){
            // if password matches
            // make auth user 
            res.render('/',{superUser:true})
        }
    })
    res.redirect('/');
})
//register page
router.post('/register', (req,res)=>{
    const {Password} = req.body

  
    // let sql=`INSERT INTO admin (Initials,First_Name, Middle_Name, Last_Name, Photo_URL)
    // VALUES ('${Initials}','${First_Name}', '${Middle_Name}', '${Last_Name}', '${Photo_URL}')
})



module.exports = router;