module.exports = function (sequelize, DataTypes) {
    var Que = sequelize.define("Que", {});
    // We're saying that a Que should belong to a Trail and a User
    // A Que can't be created without a Trail or a User due to the foreign key constraints
    Que.associate = function (models) {
        Que.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
        Que.belongsTo(models.Trail, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Que;
};
