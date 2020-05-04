

var db = require("../models");

module.exports = function(app) {

    app.get("/api/trails/que", function(req, res) {
        db.Que.findAll({}).then(function(dbQue) {
          res.json(dbQue);
        });
      });
    
 
  
};
