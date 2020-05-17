var iconOn = `<svg class="bi bi-heart-fill" id="heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://
www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" 
clip-rule="evenodd"/>
    </svg>`

var iconOff = `<svg class="bi bi-heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
</svg>`
var heart;
var lat;
var long;

$.get("/api/trails").then(function (data) {
  var top10 = data.trails;
 
  
  var count = 0;
  for (i = 0; i < top10.length && i < 5; i++) {
     //if this is the first tile then get the lat and long so we can populate the map and forecast for the first time
     if (i===0){
       lat = top10[i].latitude;
       long = top10[i].longitude;
       centerImage = top10[i].imgMedium;
       //render map
       renderMap(long,lat);
       //render 5 day forecast
       var forecastValue = `lat=${lat}&lon=${long}`;
       //render forecast
       searchWeather(forecastValue);
       //render center image
       $("#trailImageCenter").append(`<img src="${centerImage}" class="mr-3" >`);
       //render trail details
       var trailDetails = $(`<div class="media-body" id="trailDetails">`);
       trailDetails.append( `<h5 class="mt-0">Trail Details:</h5>`);
       var conditionUL = $(`<ul><li>difficulty: ${top10[i].difficulty}</li>
                                <li>stars: ${top10[i].stars}</li>
                                <li>length: ${top10[i].length}</li>
                                <li>ascent: ${top10[i].ascent}</li>
                                <li>high: ${top10[i].high}</li>
                                <li>low: ${top10[i].low}</li>
                                <li>longitude: ${top10[i].longitude}</li>
                                <li>latitude: ${top10[i].latitude}</li></ul>
                               <h6> current conditions</h6>
                               <ul><li>status: ${top10[i].conditionStatus}</li>
                               <li>details: ${top10[i].conditionDetails}</li></ul>`);
       trailDetails.append(conditionUL);
       $("#trailImageCenter").append(trailDetails);
    }
     
    function hearts(top10,count){
      //get id of logged in user
      $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
        //save the trail as a favorite attached to the user
        console.log(` USERID: ${data.id}`);
        //check if the trail is assigned as a favorite for this user.  if so append a closed heart if not append closed heart
        $.ajax({
          method: "GET",
          url: `/api/trails/favorite/${data.id}/${top10.id}`,
          data: data,
          async: false,
          success: function( res ) {
            
            var top10Div = $(`#number${count}`);
            top10Div.attr("data-lat",top10.latitude).attr("data-long",top10.longitude);
            var image = `<img src=${top10.imgSqSmall} class="trailImage" data-trailId=${top10.id} data-lat=${top10.latitude} data-long=${top10.longitude} data-location=${top10.location}>`
            top10Div.append(image);
            //
            var name = $("<div class='text-dark'>"  + top10.name + "</div>");
            top10Div.append(name);
            
            var location = $("<div>" + top10.location + "</div>");
            top10Div.append(location);
            //
            var summary = $("<div>" + "summary: " + top10.summary + "</div>");
            top10Div.append(summary);
            
            
            if (res.length > 0){
            var heart = $("<p class='heart' data-trailId = " + top10.id + " data-fill = on></p>")
             heart.append(iconOn)
             top10Div.append(heart)
            }
            else{
            var heart = $("<p class='heart' data-trailId = " + top10.id+ " data-fill = off></p>")
             heart.append(iconOff)
             top10Div.append(heart)
            }
          },
          error: function( req, status, err ) {
            console.log( 'something went wrong', status, err );
          }
        });
      });
    };
    hearts( top10[i],count);
    count ++
  
  };


  
  $("body").on("click", ".heart", function () {
    if ($(this).attr('data-fill') === "on") {
      $(this).empty();
      $(this).append(iconOff);
      $(this).attr("data-fill", "off");
      var deleteId = ($(this).attr('data-trailId'));
      deleteFavorite(deleteId);
    }
    else {
      $(this).empty();
      $(this).append(iconOn);
      $(this).attr("data-fill", "on");
      var markId = ($(this).attr('data-trailId'));
      postFavorite(markId)
    }
  });
  
});

function postFavorite(trailId) {
  //get the id from the logged in user
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    data = { UserId: data.id, trailId: trailId };
    //save the trail as a favorite attached to the user
    $.post("/api/trails/favorite", data)
      .then();
  });
};

function deleteFavorite(trailId) {
  //get the id from the logged in user
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    console.log(data.id);
    //save the trail as a favorite attached to the user
    $.ajax({
      method: "DELETE",
      url: `/api/trails/favorite/${data.id}/${trailId}`
    })
      .then();
  });
};
/// Map

function renderMap(long, lat) {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZG9jdGFyaTc3IiwiYSI6ImNrOXVhbmp4ejFubGQza3J0emJ5d3R5MWkifQ.YcKzqJrmAU5E8oYRDLsVSQ';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
		center: [long, lat], // starting position [lng, lat]
		zoom: 15 // starting zoom
	});

};

$("body").on("click",".trailImage",function (){
var long = $(this).attr("data-long");
var lat = $(this).attr("data-lat");
var trailId = $(this).attr("data-trailId");
//render map
renderMap(long, lat)
//render 5 day forecast
var forecastValue = `lat=${lat}&lon=${long}`;
searchWeather(forecastValue);
//render center image and get details
$.get(`/api/trails/${trailId}`).then(function (data) {
  var trails = data.trails;
  $("#trailImageCenter").empty();
  $("#trailImageCenter").append(`<img src="${trails[0].imgMedium}" class="mr-3" >`);
  //render trail details
  var trailDetails = $(`<div class="media-body" id="trailDetails">`);
  trailDetails.append( `<h5 class="mt-0">Trail Details:</h5>`);
  var conditionUL = $(`<ul><li>difficulty: ${trails[0].difficulty}</li>
                           <li>stars: ${trails[0].stars}</li>
                           <li>length: ${trails[0].length}</li>
                           <li>ascent: ${trails[0].ascent}</li>
                           <li>high: ${trails[0].high}</li>
                           <li>low: ${trails[0].low}</li>
                           <li>longitude: ${trails[0].longitude}</li>
                           <li>latitude: ${trails[0].latitude}</li></ul>
                          <h6> current conditions</h6>
                          <ul><li>status: ${trails[0].conditionStatus}</li>
                          <li>details: ${trails[0].conditionDetails}</li></ul>`);
  trailDetails.append(conditionUL);
  $("#trailImageCenter").append(trailDetails);
})

});
 


/// Forecast
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
      "https://api.openweathermap.org/data/2.5/weather?" +
      searchValue +
      "&appid=9ceffc16572e37c6256c7430926365a7&units=imperial",
    dataType: "json",
    success: function (data) {
      $("#forecastHeader").html(`${data.name} - 5 Day Forecast`);
      $("#today").empty();
      $("#forecast").empty();
      
      var card = $("<div>").addClass("card");
      var todayDetails = $("<p class= 'text-center'>")
        .text("Temperature: " + data.main.temp + " Humidity: " + data.main.humidity + " wind speed: " + data.wind.speed);
      var cardBody = $("<div>").addClass("card-body");
      var img = $("<img>").attr(
        "src",
        "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"
      );
      cardBody.append(todayDetails);
      card.append(cardBody);
      $("#today").append(todayDetails);
      getForecast(searchValue);
    },
  });
}
function getForecast(searchValue) {
  $.ajax({
    type: "GET",
    url:
      "https://api.openweathermap.org/data/2.5/forecast?" +
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







