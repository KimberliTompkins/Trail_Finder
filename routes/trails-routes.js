
var db = require("../models");
const axios = require("axios");

module.exports = function (app) {


  app.get("/api/trails/:longitude/:latitude", function (req, res) {
    axios.get(`https://www.hikingproject.com/data/get-trails?lat=${req.params.latitude}&lon=${req.params.longitude}&maxDistance=10&key=${process.env.TRAIL_PROJECT_KEY}`)
      .then((response) => {
        // Success 
        console.log(response.data);
        res.json(response.data);
      })
      .catch((error) => {
        if (error) throw error;
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
        if (error) throw error;
      });
  });


};
