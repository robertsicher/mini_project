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
  host: "localhost",
  port: 3306,
  user: "root",
  password,
  database: "miniProject",
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
  connection.query("SELECT * FROM reservations", (error, reservations) => {
    if (error) {
      console.log("Error:", error)
      return res.json(error)
    }
    let tables = getTables(reservations);
    let waitList = getWaitList(reservations);
    res.json({ tables, waitList });
  });
});

// Get reservation data
// Not tested (probably won't work)
server.post("/reserve", async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;
    console.log(req.body);
    await connection.query(`INSERT INTO reservations(fullName, PhoneNumber, EmailAdress) VALUES ('${name}', '${phone}', '${email}');`);
    res.json({ success })
  } catch (error) {
    console.log("There was an error while saving to database:", error);
  }
})

//Registered user 
//Getting a put
server.put("/api/tables/:id", async (req,res) => {
  connection.query("SELECT * FROM reservations", (error, reservations) => {
    if (error) {
      console.log("Error:", error)
      return res.json(error)
    }
    let currentReservation = req.body
    reservations = reservations.filter( (values) =>{ if(values.id == currentReservation.id){
      reservations.name = currentReservation.name
      reservations.phone = currentReservation.phone
      reservations.email = currentReservation.email
    }
  })
    try {
      connection.query(`INSERT INTO reservations(fullName, PhoneNumber, EmailAdress) VALUES ('${ reservations.name}', '${ reservations.phone}', '${reservations.email}');`);
      res.json({ success })
    } catch (error) {
      console.log("There was an error while saving to database:", error);
    }
      res.json({ tables, waitList });
  });
})

//Registered user
//Deleting a reservation
server.delete("/api/tables/:id", async (req,res) => {
  try {
    connection.query("SELECT * FROM reservations", (error, reservations) => {
      reservations = reservations.filter( (values) => values.id != currentReservation.id)
      connection.query(`INSERT INTO reservations(fullName, PhoneNumber, EmailAdress) VALUES ('${ reservations.name}', '${ reservations.phone}', '${reservations.email}');`);
      res.json({ success })
    })
  } catch (error) {
    console.log("There was an error while saving to database:", error);
  }

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
