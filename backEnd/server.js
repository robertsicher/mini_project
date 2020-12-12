const express = require("express");
const cors = require("cors");
const server = express();
const port = 3000;
const mysql = require("mysql");
const util = require("util");
server.use(cors());
server.use(express.static('../front end'));
// Hanle URL
server.use(express.urlencoded({ extended: true }));
// JSON read/write ability
server.use(express.json());

// MYSQL 
const password = process.argv[2];
const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password,
  database: "restaurant",
});

//let promisifiedQuery;

// Establish connection
connection.connect(function (err) {
  if (err) console.log("There was an error:", err);
  else console.log("Connected!");
  //promisifiedQuery = util.promisify(connection.query);
});


// let reservations = [];
let reservations = [];
let currentReservations = [];
let allReservations = [];

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
// your connection.query can look different 
server.get("/api/tables", async (req, res) => {
  //try {
  connection.query("SELECT * FROM restaurant.reservations", (error, reservations) => {
    if (error) {
      console.log("Error:", error)
      return res.status(500).json(error)
    }
    let tables = getTables(reservations);
    let waitList = getWaitList(reservations);
    res.json({ tables, waitList });
  });
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
  });
})

// previous ver
// server.post("/reserve", function(req, res) {
//   let newReservation = req.body;
//   reservations.push(newReservation);
//   insert(reservations)
//   res.json(newReservation);
// });

// Server listener
server.listen(port, () => {
  console.log("Server is listening in port ", port)
});



// const mysql = require("mysql")

// const connection = mysql.createConnection({
//     host : 'localhost',
//     port: 3306,
//     user:'root',
//     password : "yourRootPassword",
//     database: 'miniproject'
// })

// connection.connect(function(err){
//   if(err){
//      // console.log("error ",err)
//   }
//   else{
//      // console.log("connected",connection)
//   }


//   /* connection.query(`Insert into reservations(firstName,surname) values(${reservations.tables.name} , ${reservations.tables[0].PhoneNumber}, ${reservations.tables[0].EmailAdress})`,function(err,result){
//       if(err)console.log("error in query ", err)
//       else console.log("result", result)
//       hello(result)
//   }) */
// })


//  const insert = (reservations) => {
//   console.log(reservations)
//   currentReservations = reservations
//   console.log(currentReservations)
//   if(currentReservations.length > 1){
//     currentReservations.shift()
//   }
//   connection.query(`Insert into reservations (fullName,PhoneNumber,EmailAdress) VALUES ('${ currentReservations[0].name}' , '${ currentReservations[0].PhoneNumber}', '${ currentReservations[0].EmailAdress}');`,function(err,result){
//     if(err){
//       console.log("error in query ", err)
//     }else {
//       console.log("result", result)
//     }
//     api(result)
//   })

// }

//   const api = (result) => {
//   console.log(result)

//   connection.query(`Select * from reservations)`,function(err,result){
//     if(err)console.log("error in query ", err)
//     else console.log("result", result)})
// } 
