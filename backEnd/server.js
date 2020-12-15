const express = require("express");
const cors = require("cors");
const server = express();
const port = 3000;
const mysql = require("mysql");
const util = require("util");
const { Sequelize, DataTypes } = require('sequelize');
server.use(cors());
server.use(express.static('../front end'));
// Hanle URL
server.use(express.urlencoded({ extended: true }));
// JSON read/write ability
server.use(express.json());

// MYSQL 
const password = process.argv[2];
const connection = new Sequelize(
  'miniProject',
  'root',
  password,
  {
    host: 'localhost',
    dialect: 'mysql',
  }
);

/* const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password,
  database: "miniProject",
}); */

const Customer = connection.define('reservations', {
  id         : { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
  fullName   : { type: DataTypes.STRING(255) },
  PhoneNumber: { type: DataTypes.STRING(20) },
  EmailAddress: {type: DataTypes.STRING(255) }
},  {
  timestamps : false,
} );
Customer.sync( { /* force: true */ } );
// this table is created for us if it doesn't already exist - see the .sync() method call below
 
 

//let promisifiedQuery;

// Establish connection
/* connection.connect(function (err) {
  if (err) console.log("There was an error:", err);
  else console.log("Connected!");
  //promisifiedQuery = util.promisify(connection.query);
}); */

connection.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.then(() => {
  return Customer.findAll()
})
.then((data) => {
  console.log("matches", data);
})
.catch((error) => {
    console.log("oh no error", error);
});


// let reservations = [];
let reservations = [];
let currentReservations = [];
let allReservations = [];

//Validate email
function ValidateEmail(mail) 
{
 if (/^[^@]+@\w+(\.\w+)+\w$/.test(mail))
  {
    return (true)
  }
    console.log("You have entered an invalid email address!")
    return (false)
}

//validade phone number
function phonenumber(inputtxt)
{
  
  if((/^\d{10}$/.test(inputtxt)))
        {
      return true;
        }
      else
        {
        console.log("message");
        return false;
        }
}

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
   // Customer.findAll({})

   
 /* connection.query("SELECT * FROM reservations", (error, reservations) => {
    if (error) {
      console.log("Error:", error)
      return res.json(error)
    } */
connection.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.then(() => {
  return Customer.findAll()
})
.then((data) => {
  let tables = getTables(data);
    let waitList = getWaitList(data);
    res.json({ tables, waitList });
})
.catch((error) => {
    console.log("oh no error", error);
});


    
  //});
});

// Get reservation data
// Not tested (probably won't work)
server.post("/reserve", async (req, res) => {
  try {
    const { id, name, email, phone } = req.body;
    ValidateEmail(email)
    phonenumber(phone)
    console.log(req.body);
    connection.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.then(() => {
  return Customer.findAll()
})
.then((data) => {
  let tables = getTables(data);
    let waitList = getWaitList(data);
    res.json({ tables, waitList });
})
.catch((error) => {
    console.log("oh no error", error);
});
    //query(`INSERT INTO reservations(fullName, PhoneNumber, EmailAddress) VALUES ('${name}', '${phone}', '${email}');`);
    res.json({ success })
  }catch (error) {
    console.log("There was an error while saving to database:", error);
  }
})

//Registered user 
//Getting a put
server.put("/api/tables/:id", async (req,res) => {
  connection.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .then(() => {
    return Customer.findAll()
  })
  .then((data) => {
    let currentReservation = req.body
    data = reservations.filter( (values) =>{ if(values.id == currentReservation.id){
      data.name = currentReservation.name
      data.phone = currentReservation.phone
      data.email = currentReservation.email
  }})
})
  .catch((error) => {
      console.log("oh no error", error);
  });
   
  /* connection.query("SELECT * FROM reservations", (error, reservations) => {
    if (error) {
      console.log("Error:", error)
      return res.json(error)
    }
  
    } */
  //})
    try {
      connection.query(`INSERT INTO reservations(fullName, PhoneNumber, EmailAddress) VALUES ('${ reservations.name}', '${ reservations.phone}', '${reservations.email}');`);
      res.json({ success })
    } catch (error) {
      console.log("There was an error while saving to database:", error);
    }
      res.json({ tables, waitList });
  });


//Registered user
//Deleting a reservation
server.delete("/api/tables/:id", async (req,res) => {
  try {

    connection.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.then(() => {
  return Customer.findAll()
})
.then((data) => {
    data = data.filter((values) => values.id != currentReservation.id)
    return data
})
.then((data) => {
  Customer.create({
    fullName: `${data.fullname}`,
    PhoneNumber: `${data.PhoneNumber}`,
    EmailAddress: `${email.EmailAddress}`
  })
})
.catch((error) => {
    console.log("oh no error", error);
});
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