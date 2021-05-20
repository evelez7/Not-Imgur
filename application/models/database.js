// configuration for database access
const mysql = require('mysql');

const db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'photoapp',
    password: '',
    database: 'csc317db',
    waitForConnections: true,
    connectionLimit: 15,
    multipleStatements: true,
    queueLimit: 0
});

db_connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected");
})

module.exports = db_connection;
