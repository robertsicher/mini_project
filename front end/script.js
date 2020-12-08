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
  console.log(response.tables[0])
  tables.append("<p>" + response.tables[0].name + "<p>")
  tables.append("<p>" + response.tables[0].phone + "<p>")
  tables.append("<p>" + response.tables[0].email + "<p>")
})