const mysql = require('mysql');
//cloud mysql db connection
const dbConn = mysql.createConnection({
    host:process.env.HOST,
    port:process.env.DBPORT,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});



module.exports = dbConn;