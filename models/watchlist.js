module.exports = function (sequelize, DataTypes) {
  const Watchlist = sequelize.define('Watchlist', {
    ticker: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    }
  }, {
   indexes: [
     {
       unique: true,
       fields:['ticker', 'GroupId']
     }
   ] 
  } )
  // ADD ASSOCIATIONS HERE
  Watchlist.associate = function (models) {
    Watchlist.belongsTo(models.Group, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Watchlist
}
