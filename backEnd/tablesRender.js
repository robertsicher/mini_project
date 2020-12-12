const connection = require("./connection");
const handlebars = require("express-handlebars");

const setEngine = (server) => {
  server.engine("handlebars", handlebars({ defaultLayout: "main" }));
  server.set("view engine", "handlebars");
  console.log("Handlebars set.");
}

const inc = (value) => {
  return value + 1;
}

// Get objects for tables
const getTables = (reservations) => {
  return reservations.slice(0, 5);
};

// Get objects for wait list
const getWaitList = (reservations) => {
  return reservations.slice(5);
};

// Get response and render "tables" page with { data } included
const renderHTML = (res) => {
  connection.query("SELECT * FROM restaurant.reservations", (error, reservations) => {
    if (error) {
      console.log("Error:", error)
      return res.status(500).json(error)
    }
    let tables = getTables(reservations);
    let waitList = getWaitList(reservations);
    res.render("tables", {
      tables, waitList, helpers: {
        inc
      }
    });
  });
}

module.exports = {
  renderHTML,
  setEngine
}