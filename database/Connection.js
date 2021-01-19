const config = require('../config.json')
const { host, database, username, password, port, dialect } = config.database
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    database,
    username,
    password,
    { //mydb myuser
        dialect: dialect,
        dialectOptions: {
            host: host,
            port: port,
            user: username,
            password: password,
            database: database
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            freezeTableName: true,
            timestamps: false
        },
        // logging: console.log, //(...msg) => { console.log(msg) },
        // benchmark: true
    }
)

const Connection = {
    sequelize: sequelize,
    Sequelize: Sequelize
}

module.exports = Connection
