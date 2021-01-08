const { DataTypes, Model } = require('sequelize')
const { Sequelize, sequelize } = require('../Connection')

class User extends Model {
    getInfo() {
        return {
            user_id: this.user_id,
            username: this.username,
            role: this.role
        }
    }

    getFullName() {
        return [this.first_name, this.last_name].join(' ')
    }
}

User.init(
    {
        // Model attributes are defined here
        user_id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },

        first_name: { type: DataTypes.STRING(20), allowNull: false },

        last_name: { type: DataTypes.STRING(30), allowNull: false },

        gender: { type: DataTypes.ENUM({ values: ['male', 'female'] }), allowNull: false, defaultValue: 'male' },

        date_of_birth: { type: DataTypes.DATEONLY },

        phone_number: { type: DataTypes.STRING(20), allowNull: false, validate: { is: /^[\d\-]{10,15}$/ } },

        address: { type: DataTypes.STRING, allowNull: false },

        email: { type: DataTypes.STRING(60), unique: true, allowNull: false, validate: { is: /\S+@\S+\.\S+/i } },

        password: { type: DataTypes.STRING(60), allowNull: false, validate: { is: /^[\S]{60}$/i } },

        role: { type: DataTypes.ENUM({ values: ['employee', 'admin', 'manager'] }), allowNull: false, defaultValue: 'employee' },

        create_at: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.NOW }
    },
    {
        // Other model options go here
        sequelize,
        timestamps: false,
        tableName: 'User'
    }
)

// Create table base on model at DB
const options = { alter: true }
sequelize.sync()
    .then(result => { console.log("Model User is created! ") })
    .catch(err => { console.log(err) })

module.exports = User