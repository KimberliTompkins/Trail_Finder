module.exports = function (sequelize, DataTypes) {
    var Favorite = sequelize.define("Favorite", {});
    // We're saying that a Favorite should belong to a Trail and User
    // A Favorite can't be created without an Trail or a User due to the foreign key constraint
    Favorite.associate = function (models) {
        Favorite.belongsTo(models.Trail, {
            foreignKey: {
                allowNull: false
            }
        });
        Favorite.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Favorite;
};
