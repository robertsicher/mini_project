const express = require("express")
let server = express()
let port = 3000

// Hanle URL
server.use(express.urlencoded({ extended: true }));
// JSON read/write ability
server.use(express.json());

let reservations = [];

// Get objects for tables
const getTables = (reservations) => {
  return reservations.slice(0, 5)
};

// Get objects for wait list
const getWaitList = (reservations) => {
  return reservations.slice(5);
};

// Display homepage
server.get("/index", function(req, res) {
  res.send("Welcome to the Star Wars Page!");
});

// Display tables and wait list
server.get("/tables", function(req, res) {
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
})