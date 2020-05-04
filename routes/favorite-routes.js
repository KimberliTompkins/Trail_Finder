

var db = require("../models");

module.exports = function(app) {

    app.get("/api/trails/favorite", function(req, res) {
        db.Favorite.findAll({}).then(function(dbFavorite) {
          res.json(dbFavorite);
        });
      });
    


  app.post("/api/trails/favorite", function(req, res) {
    db.Favorite.create(req.body).then(function(dbFavorite) {
      res.json(dbFavorite);
    });
  });

  
};
