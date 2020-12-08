const express = require("express");
const cors = require("cors");
let server = express();
let port = 3000;
const mysql = require("mysql");
server.use(cors());
server.use(express.static('../front end'));
// Hanle URL
server.use(express.urlencoded({ extended: true }));
// JSON read/write ability
server.use(express.json());

// MYSQL 
const password = process.argv[2];
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password,
  database: "reservations",
});

// Establish connection
connection.connect(function (err) {
  if (err) console.log("There was an error:", err);
  else console.log("Connected!");
});

// let reservations = [];

// Get objects for tables
const getTables = (reservations) => {
  return reservations.slice(0, 5);
};

// Get objects for wait list
const getWaitList = (reservations) => {
  return reservations.slice(5);
};

// Display homepage
server.get("/", function (req, res) {
  res.sendFile("../front end/index.html", { root: __dirname });
});

// Display tables and wait list
server.get("/api/tables", async (req, res) => {
  try {
    const reservations = await connection.query("SELECT * FROM reservations");
    let tables = getTables(reservations);
    let waitList = getWaitList(reservations);
    res.json({ tables, waitList });
  } catch (error) {
    console.log("There was an error while reading from database.");
  }
});

// Get reservation data
server.post("/reserve", async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;
    await connection.query(`INSERT INTO reservations(id, name, email, phone) VALUES (${id}, ${name}, ${email}, ${phone}`);
    res.json({ success })
  } catch (error) {
    console.log("There was an error while saving to database");
  }
});

// Server listener
server.listen(port, () => {
  console.log("Server is listening in port ", port)
});

