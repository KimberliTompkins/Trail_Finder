
var db = require("../models");
const axios = require("axios");

module.exports = app => {

<<<<<<< HEAD
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
=======

  app.get("/api/trails/:longitude/:latitude", function (req, res) {
    axios.get(`https://www.hikingproject.com/data/get-trails?lat=${req.params.latitude}&lon=${req.params.longitude}&maxDistance=10&key=${process.env.TRAIL_PROJECT_KEY}`)
      .then((response) => {
        // Success 
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  });

  app.get("/api/trails/location", (req, res) => {
    db.Location.findAll({}).then(dbLocation => {
      res.json(dbLocation);
>>>>>>> master
    });
  });
  
  app.get("/api/trails/:id", function (req, res) {
    axios.get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${req.params.id}&key=${process.env.TRAIL_PROJECT_KEY}`)
      .then((response) => {
        // Success 
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  });

};
