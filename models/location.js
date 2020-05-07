module.exports = function (sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
              }
        },
        lon: {
            type:DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
              }
        }
    });

    return Location;
};
