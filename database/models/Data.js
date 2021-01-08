const { DataTypes, Model } = require('sequelize')
const { Sequelize, sequelize } = require('../Connection')

class Data extends Model { }

Data.init(
    {
        // Model attributes are defined here
        data_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        temperature: { type: DataTypes.SMALLINT, allowNull: false },

        humidity: { type: DataTypes.SMALLINT, allowNull: false },

        current: { type: DataTypes.SMALLINT, allowNull: false },

        create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },

        session_id: { type: DataTypes.SMALLINT, primaryKey: true },

        dht_id: { type: DataTypes.SMALLINT, primaryKey: true },

        machine_id: { type: DataTypes.SMALLINT, primaryKey: true },

        current_sensor_id: { type: DataTypes.SMALLINT, primaryKey: true }
    },
    {
        // Other model options go here
        sequelize,
        timestamps: false,
        tableName: 'Data'
    }
)

// Create table base on model at DB
const options = { alter: true }
sequelize.sync()
    .then(result => { console.log("Model Data is created! ") })
    .catch(err => { console.log(err) })

module.exports = Data