module.exports = function(sequelize, DataTypes) {
    var Que = sequelize.define("Que", {});
  
    Que.associate = function(models) {
      // We're saying that a Que should belong to an Trail
      // A Que can't be created without an Trail due to the foreign key constraint
      Que.belongsTo(models.Trail, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Que;
  };
  