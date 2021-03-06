const { DataTypes, Model } = require('sequelize')
const { sequelize, Sequelize } = require('../Connection')

class DHT extends Model { }

DHT.init(
    {
        // Model attributes are defined here
        dht_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        temperature_range: { type: DataTypes.STRING(30), defaultValue: null },

        temperature_accuracy: { type: DataTypes.STRING(20), defaultValue: null },

        humidity_range: { type: DataTypes.STRING(30), defaultValue: null },

        humidity_accuracy: { type: DataTypes.STRING(20), defaultValue: null },

        name: { type: DataTypes.STRING, allowNull: false, defaultValue: 'DHT11' },

        description: { type: DataTypes.STRING, defaultValue: null },

        machine_id: { type: DataTypes.SMALLINT, allowNull: false },

        create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    },
    {
        // Other model options go here
        sequelize,
        timestamps: false,
        tableName: 'DHT'
    }
)

// Create table base on model at DB
const options = { alter: true }
sequelize.sync()
    .then(result => { console.log("Model DHT is created! ") })
    .catch(err => { console.log(err) })

module.exports = DHT