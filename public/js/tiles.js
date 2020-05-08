$.get("/api/trails/favorite").then(function (data) {
  var top10 = data.trails;
  console.log(top10);
  var count = 0;
  var top0Lat;
  var top1Lat;
  var top2Lat;
  var top3Lat;
  var top4Lat;
  var top5Lat;
  var top6Lat;
  var top7Lat;
  var top8Lat;
  var top9Lat;
  //
  var top0Long;
  var top1Long;
  var top2Long;
  var top3Long;
  var top4Long;
  var top5Long;
  var top6Long;
  var top7Long;
  var top8Long;
  var top9Long;
  //
  var top0;
  var top1;
  var top2;
  var top3;
  var top4;
  var top5;
  var top6;
  var top7;
  var top8;
  var top9;

  for (i = 0; i <= 10; i++) {
    var top10Div = $(`#number${count}`);
    var currentLat = $(`#top${count}Lat`);
    var currentLong = $(`#top${count}Long`);
    var imgLink = top10[i].imgSqSmall;
    var link = top10[i].url;
    var image = $(
      "<a href=" + link + "><img src= " + top10[i].imgSqSmall + " /></a>"
    );
    top10Div.append(image);
    //
    var name = $("<div>" + "Name: " + top10[i].name + "</div>");
    top10Div.append(name);
    //
    var location = $("<div>" + "Location: " + top10[i].location + "</div>");
    top10Div.append(location);
    //
    var summary = $("<div>" + "summary: " + top10[i].summary + "</div>");
    top10Div.append(summary);
    //

    //

    //
    count = count + 1;
  }
});

//var num1 = $("<div>" + "Trail Name: " + "" + "</div>");
