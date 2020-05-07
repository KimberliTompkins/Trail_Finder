module.exports = function (sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        lat: {
            type:DataTypes.STRING,
            allowNull: false,
        },
        lon: {
            type:DataTypes.STRING,
            allowNull: false,
            
        }
    });

    return Location;
};
