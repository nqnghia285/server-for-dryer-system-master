const { DataTypes, Model } = require('sequelize')
const { Sequelize, sequelize } = require('../Connection')

class Script extends Model { }

Script.init(
    {
        // Model attributes are defined here
        script_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        name: { type: DataTypes.STRING, unique: true, allowNull: false },

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
        tableName: 'Script'
    }
)

// Create table base on model at DB
const options = { alter: true }
sequelize.sync()
    .then(result => { console.log("Model Script is created! ") })
    .catch(err => { console.log(err) })

module.exports = Script