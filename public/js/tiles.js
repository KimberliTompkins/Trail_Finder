var iconOn = `<svg class="bi bi-heart-fill" id="heart" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://
www.w3.org/2000/svg">
      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" 
clip-rule="evenodd"/>
    </svg>`

var iconOff = `<svg class="bi bi-heart-fill" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://
 www.w3.org/2000/svg">
       <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" 
 clip-rule="evenodd"/>
     </svg>`


$.get("/api/trails/favorite").then(function (data) {
  var top10 = data.trails;

  console.log(top10);
  var count = 0;
  for (i = 0; i <= 9; i++) {
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
    //get the state of the heart
    //var state = hearts(top10[i].id);
  
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

    console.log(image);

    //hearts
    //count = count + 1;
  }
});

function hearts(trailId) {
  $.get("/api/user_data").then(function (data) {
    $(".member-name").text(data.email);
    //save the trail as a favorite attached to the user
    console.log(data.id);
    $.ajax({
      method: "GET",
      url: `/api/trails/favorite/${data.id}/${trailId}`
    })
      .then(function (err, data) {
        data
      });
      
  });

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
        url: `/api/trails/favorite/ ${data.id}/${trailId}`
      })
        .then();
    });
  };

  $("body").on("click",".heart",function () {
    console.log("click")
    if ($(".heart").attr('data-fill') === "on") {
      $(".heart").empty();
      $(".heart").append(iconOn);
      $(".heart").attr("data-fill", "off");
      //var deleteId = ($(".heart").attr('data-trailId'));
      //deleteFavorite(deleteId);
    }
    else {
      $(".heart").empty();
      $(".heart").append(iconOff);
      $(".heart").attr("data-fill", "on");
      //var markId = ($("#heart").attr('data-trailId'));
      //postFavorite(markId)
    }
  });

  function hearts(trailId) {
    $.get("/api/user_data").then(function (data) {
      $(".member-name").text(data.email);
      //save the trail as a favorite attached to the user
      console.log(data.id);
      $.ajax({
        method: "GET",
        url: `/api/trails/favorite/${data.id}/${trailId}`
      })
        .then(function (err, data) {
          data
        });
    });
  };

};