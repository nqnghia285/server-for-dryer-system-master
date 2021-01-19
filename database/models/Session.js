const { DataTypes, Model } = require('sequelize')
const { sequelize, Sequelize } = require('../Connection')

class Session extends Model { }

Session.init(
    {
        // Model attributes are defined here
        session_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        name: { type: DataTypes.STRING, allowNull: false, defaultValue: '' },

        start_time: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },

        finish_time: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW },

        result: { type: DataTypes.ENUM(['bad', 'medium', 'good']), defaultValue: 'medium' },

        user_id: { type: DataTypes.SMALLINT, allowNull: false },

        script_id: { type: DataTypes.SMALLINT, allowNull: false },

        machine_id: { type: DataTypes.SMALLINT, allowNull: false },

        create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    },
    {
        // Other model options go here
        sequelize,
        timestamps: false,
        tableName: 'Session'
    }
)

// Create table base on model at DB
const options = { alter: true }
sequelize.sync()
    .then(result => { console.log("Model Session is created! ") })
    .catch(err => { console.log(err) })

module.exports = Session