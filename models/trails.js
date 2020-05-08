module.exports = function (sequelize, DataTypes) {
    var Trail = sequelize.define("Trail", {
        trailId: {
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
              }
        }
    });

    return Trail;
};
