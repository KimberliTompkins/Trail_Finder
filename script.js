var favorite1 = $.get("/api/trails/favorite").then(function (data) {
  console.log(data);
});

var num1 = $("<div>" + "Trail Name: " + "" + "</div>");
