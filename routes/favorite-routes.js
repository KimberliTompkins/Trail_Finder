const db = require("../models");
const axios = require("axios");

module.exports = function (app) {

  app.get("/api/trails/favorite", (req, res) => {
    var idList = "";
    db.Favorite.findAll({}).then(dbFavorite => {
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
          res.status(401).json(error);
        });

    });
  });

  app.get("/api/trails/favorite/:id/:trailId",function(req,res){
    
    db.Favorite.findAll({
      where: {
        UserId: req.params.id,
        trailId: req.params.trailId,

      }
    }).then(dbFavorite => {
      res.json(dbFavorite)
    })
  })
  app.post("/api/trails/favorite", (req, res) =>{
    console.log(req.params);
    db.Favorite.create(req.body).then(dbFavorite => {
      res.json(dbFavorite);
    });
  });
 
  app.delete("/api/trails/favorite/:id/:trailId", function(req, res) {
   console.log(req.params);

    db.Favorite.destroy({
      where: {
        userId: req.params.id,
        trailId: req.params.trailId
      }
    }).then( () =>{
      res.status(200).end();
    }).catch((error)=> {
      res.status(401).json(error);
    })
  });
};
