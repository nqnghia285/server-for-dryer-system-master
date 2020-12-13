const Connection = require('./Connection')
const sequelize = Connection.sequelize

const User = require('./models/User')
const Script = require('./models/Script')
const Machine = require('./models/Machine')
const Session = require('./models/Session')
const CurrentSensor = require('./models/CurrentSensor')
const DHT11 = require('./models/DHT11')
const Data = require('./models/Data')

const Models = {}

///////////////////////////////////////////////
// Add constraints into the tables
Script.belongsTo(
    User,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'user_id', targetKey: 'user_id' }
)

DHT11.belongsTo(
    Machine,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)

CurrentSensor.belongsTo(
    Machine,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)

Session.belongsTo(
    Script,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'script_id', targetKey: 'script_id' }
)

Session.belongsTo(
    User,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'user_id', targetKey: 'user_id' }
)

Session.belongsTo(
    Machine,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'machine_id', targetKey: 'machine_id' }
)

Data.belongsTo(
    Session,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'session_id', targetKey: 'session_id' }
)

Data.belongsTo(
    CurrentSensor,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'current_sensor_id', targetKey: 'current_sensor_id' }
)

Data.belongsTo(
    DHT11,
    { onUpdate: 'CASCADE', onDelete: 'CASCADE', foreignKey: 'dht11_id', targetKey: 'dht11_id' }
)

/////////////////////////////////////
// 

////////////////////////////////////
// Create tables, constraints, functions, procedures, triggers in DB

// Synchronize database
sequelize.sync()
    .then(() => { })
    .catch(err => { console.log('Sequelize sync: ', err) })

/////////////////////////////////// 
Models.CurrentSensor = CurrentSensor
Models.Data = Data
Models.DHT11 = DHT11
Models.Machine = Machine
Models.Script = Script
Models.Session = Session
Models.User = User

module.exports = Models
