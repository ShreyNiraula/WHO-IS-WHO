var mysql = require("mysql");
// DOT ENV
const dotenv = require("dotenv");
dotenv.config();

const DATABASE_CREDENTIAL = process.env.DATABASE_CREDENTIAL;

// TODO: later change to dot evn
const db = mysql.createConnection(DATABASE_CREDENTIAL);

// db connection
db.connect((err) => {
  if (err) throw err;
  console.log("my sql connected");
});

module.exports = db;
