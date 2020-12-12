const mysql = require("mysql");

// MYSQL 
const password = process.argv[2];
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password,
  database: "restaurant",
});

// Establish connection
connection.connect(function (err) {
  if (err) console.log("There was an error:", err);
  else console.log("Connected!");
  //promisifiedQuery = util.promisify(connection.query);
});

module.exports = connection;