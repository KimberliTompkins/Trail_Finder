var iconOn = `<svg class="bi bi-heart-fill" id="heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://
www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" 
clip-rule="evenodd"/>
    </svg>`

var iconOff = `<svg class="bi bi-heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
</svg>`
var heart;
$.get("/api/trails").then(function (data) {
  var top10 = data.trails;
 
  
  var count = 0;
  for (i = 0; i < top10.length && i < 5; i++) {
     
    function hearts(top10,count){
      $.get("/api/user_data").then(function (data) {
        $(".member-name").text(data.email);
        //save the trail as a favorite attached to the user
        console.log(` USERID: ${data.id}`);
        var retVal;
        $.ajax({
          method: "GET",
          url: `/api/trails/favorite/${data.id}/${top10.id}`,
          data: data,
          async: false,
          success: function( res ) {
            
            var top10Div = $(`#number${count}`);
            var image = `<img src=${top10.imgSqSmall} class="trailImage" data-lat=${top10.latitude} data-long=${top10.longitude} data-location=${top10.location}>`
            top10Div.append(image);
            //
            var name = $("<div>" + "Name: " + top10.name + "</div>");
            top10Div.append(name);
            //
            var location = $("<div>" + "Location: " + top10.location + "</div>");
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



