var iconOn = `<svg class="bi bi-heart-fill" id="heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://
www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" 
clip-rule="evenodd"/>
    </svg>`

var iconOff = `<svg class="bi bi-heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z" clip-rule="evenodd"/>
</svg>`

$.get("/api/trails").then(function (data) {
  var top10 = data.trails;

  console.log(top10);
  var count = 0;
  for (i = 0; i< top10.length && i < 10; i++) {
    var top10Div = $(`#number${count}`);
    var currentLat = $(`#top${count}Lat`);
    var currentLong = $(`#top${count}Long`);
    var image = `<img src=${top10[i].imgSqSmall} class="trailImage" data-lat=${top10[i].latitude} data-long=${top10[i].longitude}>`
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

    //get the state of the heart
    
    var state = hearts(top10[i].id);
     console.log(`state ${state}`)
    var heart = $("<p class='heart' data-trailId = " + top10[i].id + " data-fill = on></p>")
    heart.append(iconOn)
    // if (sate === "on"){
    // heart.append(iconOn)
    // }
    // else{
    // heart.append(iconOff)
    // }
    // 
    top10Div.append(heart)


    //hearts
    //count = count + 1;
  }
  $("body").on("click",".heart",function () {
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

function hearts(trailId) {
  
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    //save the trail as a favorite attached to the user
    console.log(` USERID: ${data.id}`);
    var retVal;
    $.ajax({
      method: "GET",
      url: `/api/trails/favorite/${data.id}/${trailId}`,
      data: data,
        async: false,
        success:function(response) {
          retVal = "on";
          return retVal;
        }
    });
});
};
  function postFavorite(trailId) {
    //get the id from the logged in user
    $.get("/api/user_data").then(function (data) {
      $(".member-name").text(data.email);
      data = { UserId: data.id, trailId: trailId };
      //save the trail as a favorite attached to the user
      console.log(data);
      $.post("/api/trails/favorite", data)
        .then();
    });
  };

  function deleteFavorite(trailId) {
    //get the id from the logged in user
    console.log("delete");
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



