const fs = require("fs");
const mysql = require('mysql')
// const db = require("../models/database.js");

const db = mysql.createConnection({
  host: "localhost",
  user: "photoapp",
  password: "",
    waitForConnections: true,
    connectionLimit: 15,
    multipleStatements: true,
    queueLimit: 0
});

const mysql_dump = fs.readFileSync("./config/csc317db.sql").toString();
const mysql_array = mysql_dump.toString().split(");");

mysql_array.forEach(query =>
{
  if (query) {
    query += ");";
    db.query(query, (err, result) =>
    {
      if (err) throw err;
    });
  }
});

setTimeout((function ()
{
  console.log("Done! Database initialized!");
  return process.exit(1);
}), 100);
