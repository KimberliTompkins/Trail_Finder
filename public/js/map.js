

	renderMap("-105.2755","39.9787")
	// $.get("/api/trails/location").then(function (data) {
		// populateSearch(data);
	// });


function renderMap(long, lat) {
	mapboxgl.accessToken = 'pk.eyJ1IjoiZG9jdGFyaTc3IiwiYSI6ImNrOXVhbmp4ejFubGQza3J0emJ5d3R5MWkifQ.YcKzqJrmAU5E8oYRDLsVSQ';
	var map = new mapboxgl.Map({
		container: 'map', // container id
		style: 'mapbox://styles/mapbox/outdoors-v11', // stylesheet location
		center: [long, lat], // starting position [lng, lat]
		zoom: 15 // starting zoom
	});

};
function populateSearch(data) {
	for (const item in data) {
		var option = `<option data-lat="${data[item].lat}" data-long="${data[item].lon}">${data[item].name}</option>`
		$("#searchTrail").append(option);
	}

};
$("#searchTrail").change(function () {
	var options =  $( "#searchTrail" ).val();
	var long = $("#searchTrail").find(":selected").attr('data-long');
	var lat = $("#searchTrail").find(":selected").attr('data-lat');
	renderMap(long, lat)
});
//

$("body").on("click",".trailImage",function (){
	var long = $(this).attr("data-long");
var lat = $(this).attr("data-lat");
renderMap(long, lat)
});
 















