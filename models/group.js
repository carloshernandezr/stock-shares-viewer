module.exports = function (sequelize, DataTypes) {
    let Group = sequelize.define("Group", {
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50]
            }
        }
    });

    // ADD ASSOCIATIONS HERE
    Group.associate = function(models) {
        Group.hasMany(models.Watchlist, {
            onDelete: "cascade"
        })
    };
    Group.associate = function(models) {
        Group.hasMany(models.Portfolio, {
            onDelete: "cascade"
        })
    };
    return Group;
}