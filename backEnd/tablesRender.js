const connection = require("./connection")
// const handlebars = require("handlebars")

// Get objects for tables
const getTables = (reservations) => {
  return reservations.slice(0, 5);
};

// Get objects for wait list
const getWaitList = (reservations) => {
  return reservations.slice(5);
};


const renderHTML = (res) => {
  connection.query("SELECT * FROM restaurant.reservations", (error, reservations) => {
    if (error) {
      console.log("Error:", error)
      return res.status(500).json(error)
    }
    let tables = getTables(reservations);
    let waitList = getWaitList(reservations);
    res.json({ tables, waitList });
  });
}

module.exports = renderHTML;