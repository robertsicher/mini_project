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
let currentReservations =[];
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
  insert(reservations)
  res.json(newReservation);
});

// Server listener
server.listen(port, () => {
    console.log("Server is listening in port ", port)
});


const mysql = require("mysql")

const connection = mysql.createConnection({
    host : 'localhost',
    port: 3306,
    user:'root',
    password : "yourRootPassword",
    database: 'miniproject'
})

connection.connect(function(err){
  if(err){
     // console.log("error ",err)
  }
  else{
     // console.log("connected",connection)
  }

  
  /* connection.query(`Insert into reservations(firstName,surname) values(${reservations.tables.name} , ${reservations.tables[0].PhoneNumber}, ${reservations.tables[0].EmailAdress})`,function(err,result){
      if(err)console.log("error in query ", err)
      else console.log("result", result)
      hello(result)
  }) */
})


 const insert = (reservations) => {
  console.log(reservations)
  currentReservations = reservations
  console.log(currentReservations)
  if(currentReservations.length > 1){
    currentReservations.shift()
  }
  connection.query(`Insert into reservations (fullName,PhoneNumber,EmailAdress) VALUES ('${ currentReservations[0].name}' , '${ currentReservations[0].PhoneNumber}', '${ currentReservations[0].EmailAdress}');`,function(err,result){
    if(err){
      console.log("error in query ", err)
    }else {
      console.log("result", result)
    }
    api(result)
  })

}

  const api = (result) => {
  console.log(result)

  connection.query(`Select * from reservations)`,function(err,result){
    if(err)console.log("error in query ", err)
    else console.log("result", result)})
} 