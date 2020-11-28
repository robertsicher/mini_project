const express = require("express")
const cors = require("cors")
let server = express()
let port = 3000
server.use(cors())

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

// Get reservation data
server.get("/reserve", function(req, res) {
  res.send("data collect")
});

// Display tables and wait list
server.get("./frontend/tables.html", function(req, res) {
  let tables = getTables(reservations);
  let waitList = getWaitList(reservations);
  return res.json({tables, waitList});
});

// Server listener
server.listen(port, () => {
    console.log("Server is listening in port ", port)
})