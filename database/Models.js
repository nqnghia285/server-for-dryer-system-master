const { sequelize } = require('./Connection')
const { mergeDayWithDuration } = require('../common_functions/SystemFunction')

const User = require('./models/User')
const Script = require('./models/Script')
const Machine = require('./models/Machine')
const Session = require('./models/Session')
const CurrentSensor = require('./models/CurrentSensor')
const DHT = require('./models/DHT')
const Data = require('./models/Data')

///////////////////////////////////////////////
// Add constraints into the tables
User.hasMany(
    Script,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'user_id', targetKey: 'user_id' }
)
Script.belongsTo(
    User,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'user_id', targetKey: 'user_id' }
)

Machine.hasMany(
    DHT,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)
DHT.belongsTo(
    Machine,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)

Machine.hasMany(
    CurrentSensor,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)
CurrentSensor.belongsTo(
    Machine,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)

Script.hasMany(
    Session,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'script_id', targetKey: 'script_id' }
)
Session.belongsTo(
    Script,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'script_id', targetKey: 'script_id' }
)

User.hasMany(
    Session,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'user_id', targetKey: 'user_id' }
)
Session.belongsTo(
    User,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'user_id', targetKey: 'user_id' }
)

Machine.hasMany(
    Session,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)
Session.belongsTo(
    Machine,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)

Session.hasMany(
    Data,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'session_id', targetKey: 'session_id' }
)
Data.belongsTo(
    Session,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'session_id', targetKey: 'session_id' }
)

CurrentSensor.hasMany(
    Data,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'current_sensor_id', targetKey: 'current_sensor_id' }
)
Data.belongsTo(
    CurrentSensor,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'current_sensor_id', targetKey: 'current_sensor_id' }
)

DHT.hasMany(
    Data,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'dht_id', targetKey: 'dht_id' }
)
Data.belongsTo(
    DHT,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'dht_id', targetKey: 'dht_id' }
)
/////////////////////////////////////
// Add hooks
Session.beforeCreate(async (session, options) => {
    let script = await Script.findOne({ where: { script_id: session.script_id } })
    let user = await User.findOne({ where: { user_id: session.user_id } })
    let machine = await Machine.findOne({ where: { machine_id: session.machine_id } })

    if (script !== null && user !== null && machine !== null) {
        session.name = `${user.user_id}: ${user.getFullName()} - ${machine.machine_id}: ${machine.name} - ${script.script_id}: ${script.name}`
        session.finish_time = mergeDayWithDuration(session.start_time, script.time)
    }
})

////////////////////////////////////
// Create tables, constraints, functions, procedures, triggers in DB

// Synchronize database
sequelize.sync()
    .then(() => { })
    .catch(err => { console.log('Sequelize sync: ', err) })

///////////////////////////////////
const Models = {
    CurrentSensor: CurrentSensor,
    Data: Data,
    DHT: DHT,
    Machine: Machine,
    Script: Script,
    Session: Session,
    User: User
}

module.exports = Models