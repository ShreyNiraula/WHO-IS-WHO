var mysql = require("mysql");
// require("dotenv").config();

// const db = mysql.createConnection({
//   host: "bj5wulbhjpvrt6obt3me-mysql.services.clever-cloud.com",
//   user: "un0gdi6442coj4mb",
//   database: "bj5wulbhjpvrt6obt3me",
//   password: "OypporrOgolz6s9XYS08",
//   port: 3306,
// });

// TODO: later change to dot evn
const db = mysql.createConnection(
  "mysql://un0gdi6442coj4mb:OypporrOgolz6s9XYS08@bj5wulbhjpvrt6obt3me-mysql.services.clever-cloud.com:3306/bj5wulbhjpvrt6obt3me"
);

// db connection
db.connect((err) => {
  if (err) throw err;
  console.log("my sql connected");
});

module.exports = db;
