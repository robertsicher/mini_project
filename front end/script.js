const inputName = $("#reserveName");
const inputPhone = $("#reserveNumber");
const inputEmail = $("#reserveEmail");

$("#reserve-btn").click(function (event) {
  event.preventDefault();
  if ((inputName.val().replace(/ /g, "") < 1) || (inputPhone.val().replace(/ /g, "") < 1 || inputEmail.val().replace(/ /g, "") < 1)) {
    alert("Cannot submit empty fields. Please provide proper details.")
  } else {
    $.ajax({
      method: "post",
      url: "/reserve",
      data: {
        "name": inputName.val(),
        "phone": inputPhone.val(),
        "email": inputEmail.val(),
      },
    }).then(() => {
      document.location.href = "http://localhost:3000/tables.html";
    }).catch(() => {
      alert("There was an error while sending data.")
    })
  }
});

const restaurantTables = $("#tableSection");
const waitlistSection = $("#waitlistSection");

$.ajax({
  method: "get",
  url: "/api/tables",
}).then((response) => {
  populateTables(response.tables);
  writeWaitList(response.waitList);
}).catch(() => {
  alert("There was an error while reading data from DB.")
});

const populateTables = (tables) => {
  console.log(tables);
  if (tables.length > 0) {
    restaurantTables.append(`
    <tr>
      <th scope="col">Table number</th>
      <th scope="col">Name</th>
      <th scope="col">Phone number</th>
      <th scope="col">Email</th>
    </tr>`)
    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      restaurantTables.append(`
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${table.name}</td>
      <td>${table.phone}</td>
      <td>${table.email}</td>
    </tr>
    `);
    }
  } else {
    restaurantTables.append(`
    <hr />
    <h3>All tables are free!</h3>`);
  }
};

const writeWaitList = (waiting) => {
  if (waiting.length > 0) {
    waitlistSection.append(`
    <tr>
      <th scope="col">Number in queue</th>
      <th scope="col">Name</th>
      <th scope="col">Phone number</th>
      <th scope="col">Email</th>
    </tr>`)
    for (let i = 0; i < waiting.length; i++) {
      const waitingPerson = waiting[i];
      waitlistSection.append(`
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${waitingPerson.name}</td>
      <td>${waitingPerson.phone}</td>
      <td>${waitingPerson.email}</td>
    </tr>
    `);
    }
  } else {
    waitlistSection.append(`
    <hr />
    <h3>There's no one waiting.</h3>`);
  }
}