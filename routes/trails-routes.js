var db = require("../models");
const axios = require("axios");

module.exports = app => {

  app.get("/api/trails/", (req, res) => {
    var idList = "";
    db.Trail.findAll({}).then(dbTrail => {
      //res.json(dbFavorite);
      for (const index in dbTrail) {
        idList = idList + `${dbTrail[index].trailId},`
      };
      axios
        .get(`https://www.hikingproject.com/data/get-trails-by-id?ids=${idList}&key=${process.env.TRAIL_PROJECT_KEY}`)
        .then((response) => {
          // Success 
          res.json(response.data)
        })
        .catch((error) => {
          res.status(401).json(error);
        });
    });
  });
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

}