$.get("/api/trails/favorite").then(function (data) {
  var top10 = data.trails;
  console.log(top10);
  var count = 0;
  for (i = 0; i <= 10; i++) {
    var top10Div = $(`#number${count}`);
    var name = $("<div>" + "Name: " + top10[i].name + "</div>");
    top10Div.append(name);
    //
    var location = $("<div>" + "Location: " + top10[i].location + "</div>");
    top10Div.append(location);
    //
    var summary = $("<div>" + "summary: " + top10[i].summary + "</div>");
    top10Div.append(summary);
    //
    var imgLink = top10[i].imgSqSmall;
    var image = $("<a href=" + '"' + imgLink + '"' + ">" + "</a>");
    top10Div.append(image);
    console.log(image);

    //
    count = count + 1;
  }
});

//var num1 = $("<div>" + "Trail Name: " + "" + "</div>");
