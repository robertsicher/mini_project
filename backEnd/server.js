const express = require("express");
const cors = require("cors");
let server = express();
let port = 3000;
server.use(cors());
server.use(express.static('../front end'));
// Hanle URL
server.use(express.urlencoded({ extended: true }));
// JSON read/write ability
server.use(express.json());

let reservations = [];

// Get objects for tables
const getTables = (reservations) => {
  return reservations.slice(0, 5);
};

// Get objects for wait list
const getWaitList = (reservations) => {
  return reservations.slice(5);
};

// Display homepage
server.get("/", function(req, res) {
  res.sendFile("../front end/index.html", {root: __dirname});
});

// Display tables and wait list
server.get("/api/tables", function(req, res) {
  let tables = getTables(reservations);
  let waitList = getWaitList(reservations);
  return res.json({tables, waitList});
});

// Get reservation data
server.post("/reserve", function(req, res) {
  let newReservation = req.body;
  reservations.push(newReservation);
  res.json(newReservation);
});

// Server listener
server.listen(port, () => {
    console.log("Server is listening in port ", port)
});