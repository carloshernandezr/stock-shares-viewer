module.exports = function(sequelize, DataTypes){
    let Watchlist = sequelize.define("Watchlist", {
        ticker: DataTypes.STRING
    });
    return Watchlist;
}