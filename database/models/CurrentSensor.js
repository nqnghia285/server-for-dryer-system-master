const { DataTypes, Model } = require('sequelize')
const { sequelize, Sequelize } = require('../Connection')

class CurrentSensor extends Model { }

CurrentSensor.init(
    {
        // Model attributes are defined here
        current_sensor_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        current_range: { type: DataTypes.STRING(30), defaultValue: null },

        current_accuracy: { type: DataTypes.STRING(20), defaultValue: null },

        name: { type: DataTypes.STRING, allowNull: false },

        description: { type: DataTypes.STRING, defaultValue: null },

        machine_id: { type: DataTypes.SMALLINT, allowNull: false },

        create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    },
    {
        // Other model options go here
        sequelize,
        timestamps: false,
        tableName: 'CurrentSensor'
    }
)

// Create table base on model at DB
const options = { alter: true }
CurrentSensor.sync()
    .then(result => { console.log("Model CurrentSensor is created! ") })
    .catch(err => { console.log(err) })

module.exports = CurrentSensor