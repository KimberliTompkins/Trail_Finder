module.exports = function(sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {});
  
    Favorite.associate = function(models) {
      // We're saying that a Favorite should belong to a Trail
      // A Favorite can't be created without an Trail due to the foreign key constraint
      Favorite.belongsTo(models.Trail, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Favorite;
  };
  