$("#reserve-btn").click(function () {
  $.post("http://localhost:3000/reserve",
    {
      "name": $("#reserveName").val(),
      "phone": $("#reserveNumber").val(),
      "email": $("#reserveEmail").val(),
      "id": $("#uniqueId").val(),
    })
});

const tables = $("#tableSection");

$.ajax({
  method: "get",
  url: "/api/tables",
}).then((response) => {
  if (response.tables.length > 0) {
    tables.append(`
    <tr>
      <th scope="col">Table number</th>
      <th scope="col">Name</th>
      <th scope="col">Phone number</th>
      <th scope="col">Email</th>
    </tr>`)
    for (let i = 0; i < response.tables.length; i++) {
      const element = response.tables[i];
      tables.append(`
    <tr>
      <th scope="row">${i + 1}</th>
      <td>${element.name}</td>
      <td>${element.phone}</td>
      <td>${element.email}</td>
    </tr>
    `);
    }
  } else {
    tables.append(`
    <hr />
    <h3>All tables are free!</h3>`);
  };
})