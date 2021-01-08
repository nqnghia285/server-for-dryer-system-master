const { DataTypes, Model } = require('sequelize')
const { Sequelize, sequelize } = require('../Connection')

class Machine extends Model { }

Machine.init(
    {
        // Model attributes are defined here
        machine_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        name: { type: DataTypes.STRING, unique: true, allowNull: false },

        description: { type: DataTypes.STRING, defaultValue: null },

        code: { type: DataTypes.STRING(100), unique: true, allowNull: false },

        position: { type: DataTypes.STRING, allowNull: false },

        create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    },
    {
        // Other model options go here
        sequelize,
        timestamps: false,
        tableName: 'Machine'
    }
)

// Create table base on model at DB
const options = { alter: true }
sequelize.sync()
    .then(result => { console.log("Model Machine is created! ") })
    .catch(err => { console.log(err) })

module.exports = Machine