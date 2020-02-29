module.exports = function(sequelize, DataTypes){
    let Watchlist = sequelize.define("Watchlist", {
        ticker: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
            len: [1, 10]
          }
        }
    });
    return Watchlist;
}