

var db = require("../models");

module.exports = function(app) {

    app.get("/api/trails", function(req, res) {
        db.Trail.findAll({}).then(function(dbTrail) {
          res.json(dbTrail);
        });
      });
    

  app.get("/api/trails/:longitude/:latitude", function(req, res) {
    db.Trail.findOne({
      where: {
       longitude:req.params.longitude,
       latitude :req.params.latitude
      }
    }).then(function(dbTrail) {
      console.log(dbTrail);
      res.json(dbTrail);
    });
  });

  app.post("/api/trails", function(req, res) {
    db.Trail.create(req.body).then(function(dbTrail) {
      res.json(dbTrail);
    });
  });

  
};
