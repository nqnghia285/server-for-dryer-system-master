const { DataTypes, Model } = require('sequelize')
const { Sequelize, sequelize } = require('../Connection')

class Scrip extends Model { }

Scrip.init(
    {
        // Model attributes are defined here
        script_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        name: { type: DataTypes.STRING, allowNull: false },

        description: { type: DataTypes.STRING, defaultValue: null },

        type_of_fruit: { type: DataTypes.STRING(100), allowNull: false },

        mass: { type: DataTypes.INTEGER, allowNull: false },

        time: { type: DataTypes.INTEGER, allowNull: false },

        temperature: { type: DataTypes.SMALLINT, allowNull: false },

        humidity: { type: DataTypes.SMALLINT, allowNull: false },

        user_id: { type: DataTypes.SMALLINT, allowNull: false },

        create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    },
    {
        // Other model options go here
        sequelize,
        timestamps: false,
        tableName: 'Scrip'
    }
)

// Create table base on model at DB
const options = { alter: true }
Scrip.sync()
    .then(result => { console.log("Model Scrip is created! ") })
    .catch(err => { console.log(err) })

module.exports = Scrip