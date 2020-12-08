$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "/api/tables",
        //data: data,
        // success: success,
         //dataType: "jsonp"
    }).then(
        (data) => {
            console.log(data)
            data.tables.forEach(element => {
        $("#tableSection").append("<p>" + data.tables[0].name + "<p>")
        $("#tableSection").append("<p>" + data.tables[0].PhoneNumber + "<p>")
        $("#tableSection").append("<p>" + data.tables[0].EmailAdress + "<p>")
    });
        }).catch(
            (err) => {
                console.log(err)
            })
})
$("#reserve-btn").click(function () {
    $.post("http://localhost:3000/reserve",
      {
        "name": $("#reserveName").val(),
        "PhoneNumber": $("#reserveNumber").val(),
        "EmailAddress": $("#reserveEmail").val(),
        "UniqueId": $("#uniqueId").val(),

      })
    });