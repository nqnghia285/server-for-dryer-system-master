const { DataTypes, Model } = require('sequelize')
const { sequelize, Sequelize } = require('../Connection')

class Data extends Model { }

Data.init(
    {
        // Model attributes are defined here
        data_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        temperature: { type: DataTypes.FLOAT, allowNull: false },

        humidity: { type: DataTypes.FLOAT, allowNull: false },

        current: { type: DataTypes.FLOAT, allowNull: false },

        session_id: { type: DataTypes.SMALLINT, primaryKey: true },

        dht_id: { type: DataTypes.SMALLINT, primaryKey: true },

        current_sensor_id: { type: DataTypes.SMALLINT, primaryKey: true },

        create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },
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