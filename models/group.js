module.exports = function (sequelize, DataTypes) {
  const Group = sequelize.define('Group', {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    },
    isWatchlist: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1
    }

  })

  // ADD ASSOCIATIONS HERE
  Group.associate = function (models) {
    Group.hasMany(models.Watchlist, {
      onDelete: 'cascade'
    })
    Group.hasMany(models.Portfolio, {
      onDelete: 'cascade'
    })
  }
  return Group
}
