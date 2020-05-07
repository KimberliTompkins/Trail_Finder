function postFavorite(trailId) {
    //get the id from the logged in user
    $.get("/api/user_data").then(function(data) {
      $(".member-name").text(data.email);
      console.log(data.id);
      //save the trail as a favorite attached to the user
      $.post("/api/trails/favorite", data.id,trailId)
      .then();
    });
  };