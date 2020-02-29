module.exports = function (sequelize, DataTypes) {
    let Portfolio = sequelize.define("Portfolio", {
        date: DataTypes.DATE,
        ticker: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 10]
            }
        },
        shares: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
        purchasePrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        sellDate: DataTypes.DATE,
        sellPrice: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            validate: {
                min: 0
            }
        },
        soldShares: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },
    });
    return Portfolio
}