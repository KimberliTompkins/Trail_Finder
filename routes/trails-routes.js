

var db = require("../models");

module.exports = function(app) {

    app.get("/api/trails", function(req, res) {
        db.Trails.findAll({}).then(function(dbTrail) {
          res.json(dbTrail);
        });
      });
    

  app.get("/api/trails/:longitude/:latitude", function(req, res) {
    db.Trails.findOne({
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
    db.Trails.create(req.body).then(function(dbTrail) {
      res.json(dbTrail);
    });
  });

  
};
