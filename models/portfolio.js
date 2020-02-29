module.exports = function(sequelize, DataTypes) {
    let Portfolio = sequelize.define("Portfolio", {
        date: DataTypes.DATE,
        ticker: DataTypes.STRING,
        shares: DataTypes.INTEGER,
        purchasePrice: DataTypes.DECIMAL,
        sellDate: DataTypes.DATE,
        sellPrice: DataTypes.DECIMAL,
        soldShares: DataTypes.INTEGER,
    });
    return Portfolio
}