$(document).ready(function () {
  $("#search-button").on("click", function () {
    var searchValue = $("#search-value").val();
    $("#search-value").val("");
    console.log($(".number0").attr('data-location'))
    searchWeather(searchValue);
  });
  function makeRow(text) {
    var li = $("<li>")
      .addClass("list-group-item list-group-item-action")
      .text(text);
    $(".history").append(li);
  }
  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchValue +
        "&appid=13730915aa4abe92f3e584777a1a74d8&units=imperial",
      dataType: "json",
      success: function (data) {
        console.log(data);
        $("#today").empty();
        var card = $("<div>").addClass("card");
        var wind = $("<div>")
          .addClass("card-text")
          .text("wind speed" + data.wind.speed);
        var humid = $("<div>")
          .addClass("card-text")
          .text("Humidity" + data.main.humidity);
        var temp = $("<div>")
          .addClass("card-text")
          .text("Temperature" + data.main.temp);
        var cardBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr(
          "src",
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
        );
        cardBody.append(temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);
        getForecast(searchValue);
        //get uv would go here
      },
    });
  }
  function getForecast(searchValue) {
    $.ajax({
      type: "GET",
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        searchValue +
        "&appid=13730915aa4abe92f3e584777a1a74d8&units=imperial",
      dataType: "json",
      success: function (data) {
        $("#forecast")
          //.html('<h4 class="mt-3">5-Day Forecast:</h4>')
          .append('<div class="row">');
        for (i = 0; i < data.list.length; i++) {
          if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
            var col = $("<div>").addClass("col-md-2");
            var card = $("<div>").addClass("card bg-primary text-white");
            var body = $("<div>").addClass("card-body p-2");
            var img = $("<img>").attr(
              "src",
              "http://openweathermap.org/img/w/" +
                data.list[i].weather[0].icon +
                ".png"
            );
            var p1 = $("<p>")
              .addClass("card-text")
              .text("temperature: " + data.list[i].main.temp_max);
            var p2 = $("<p>")
              .addClass("card-text")
              .text("humidity: " + data.list[i].main.humidity);
            col.append(card.append(body.append(img, p1, p2)));
            $("#forecast .row").append(col);
          }
        }
      },
    });
  }
  //uv function would go here
  var history = JSON.parse(window.localStorage.getItem("history")) || [];
  if (history.length > 0) {
    searchWeather(history[history.length - 1]);
  }
  for (i = 0; i < history.length; i++) {
    makeRow(history[i]);
  }
});
