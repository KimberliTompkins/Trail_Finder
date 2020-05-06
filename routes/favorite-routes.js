const db = require("../models");
const axios = require("axios");

module.exports = function (app) {

  app.get("/api/trails/favorite", function (req, res) {
    var idList = "";
    db.Favorite.findAll({}).then(function (dbFavorite) {
      //res.json(dbFavorite);
      for (const index in dbFavorite) {
        idList = idList + `${dbFavorite[index].trailId},`
      };
      axios
        .get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${idList}&key=${process.env.TRAIL_PROJECT_KEY}`)
        .then((response) => {
          // Success 
          res.json(response.data)
        })
        .catch((error) => {
          if (error) throw error;
        });

    });
  });


  app.post("/api/trails/favorite", function (req, res) {
    console.log(req.body)
    db.Favorite.create(req.body).then(function (dbFavorite) {
      res.json(dbFavorite);
    });
  });


};
