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
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        sellDate: DataTypes.DATE,
        sellPrice: {
            type: DataTypes.DECIMAL(10, 2),
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

    // ADD ASSOCIATIONS HERE
    Portfolio.associate = function (models) {
        Portfolio.belongsTo(models.Group, {
            foreignKey: {
                allowNull: false
            }
        })
    };
    return Portfolio
}