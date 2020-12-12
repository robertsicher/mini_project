const express = require("express");
const cors = require("cors");
const server = express();
const port = 3000;
const util = require("util");
const tablesRender = require("./tablesRender");
server.use(cors());
server.use(express.static('../front end'));
// Hanle URL
server.use(express.urlencoded({ extended: true }));
// JSON read/write ability
server.use(express.json());
const connection = require("./connection")

// Display homepage
server.get("/", function (req, res) {
  res.sendFile("../front end/index.html", { root: __dirname });
});

// Display tables and wait list
server.get("/api/tables", async (req, res) => {
  tablesRender(res);
});

// Get reservation data
server.post("/reserve", async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(req.body);
  connection.query(`INSERT INTO restaurant.reservations(name, email, phone) VALUES ("${name}", "${email}", "${phone}")`, (error, success) => {
    if (error) {
      console.log("There was an error while saving to database:", error);
      return res.status(500).json(error)
    }
    res.json({ success });
  })
});

// Server listener
server.listen(port, () => {
  console.log("Server is listening in port ", port)
});
