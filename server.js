require('dotenv').config()
const { Machine } = require('./database/Models')
// require('./database/InsertTemplates')

const express = require('express')
const app = express()

const PORT = process.env.SERVER_PORT
const ORIGIN = process.env.ORIGIN
const HOST_NAME = process.env.HOST_NAME
const server = require("http").Server(app)

const cors = require('cors')
const { json, urlencoded } = require('body-parser')
const cookieParser = require('cookie-parser')
const ip = require('ip')
const { findIndexOfMachineInList } = require('./common_functions/SystemFunction')
///////////////////////////////////////////////////////////////
// Params Global
const machineList = []
const userList = []
app.locals.machineList = machineList
app.locals.userList = userList
///////////////////////////////////////////////////////////////
// Socket.IO
const io = require('socket.io')(server, {
    cors: {
        origin: [ORIGIN],
        methods: ["GET", "POST"]
    }
})
const client = io.of('/client')

// Global variables
app.locals.io = io
app.locals.client = client

io.on('connection', socket => {
    socket.emit('server-send-ack-connection', 'Connected to server.')

    // Listener 'mcu-send-data'
    socket.on('mcu-send-data', async message => {

        console.log(message);

        console.log(await updateStatusDeviceOfMachineInList(message, machineList));
        console.log(machineList);
        machineList.forEach(obj => {
            console.log(obj.statusDevice.sensor);
        })

        // Send machineList to all Clients
        client.emit('server-send-update-machine-list', { machineList: machineList })

        // console.log(JSON.parse(message))
        // socket.emit('server-send-control', '{"message":"Hello [NodeMCU 12E]."}')
    })

    // Listener 'mcu-send-ack-control-machine'
    socket.on('mcu-send-ack-control-machine', message => {
        console.log(message);
    })

    // Listener 'mcu-send-ack-control-device'
    socket.on('mcu-send-ack-control-device', message => {
        console.log(message);
    })

    // Listener 'mcu-send-ack-set-cycle-time'
    socket.on('mcu-send-ack-set-cycle-time', message => {
        console.log(message);
    })

    // Listener 'mcu-send-ack-script'
    socket.on('mcu-send-ack-script', message => {
        console.log(message);
    })

    // Listener 'mcu-send-ack-control-manual-or-auto'
    socket.on('mcu-send-ack-control-manual-or-auto', message => {
        console.log(message);
    })

    // Listener 'mcu-send-ready'
    socket.on('mcu-send-ready', async message => {
        console.log(message);

        await updateMachineList(message, machineList)
        console.log(machineList);

        // Send machineList to all Clients
        client.emit('server-send-update-machine-list', { machineList: machineList })
    })

    // Listener 'disconnect'
    socket.on('disconnect', message => {
        console.log(message)
        socket.disconnect()
    })

    let flag = true;

    setInterval(() => {
        if (flag) {
            socket.emit('server-send-control-device', '{ "e-fan": true, "b-fan": false, "heater": true }')
        } else {
            socket.emit('server-send-control-device', '{ "e-fan": false, "b-fan": true, "heater": false }')
        }
        flag = !flag;
    }, 5000)

    setTimeout(() => {
        socket.emit('server-send-control-machine', '{"status":"off"}')
    }, 15000)

    setTimeout(() => {
        socket.emit('server-send-control-machine', '{"status":"running"}')
    }, 17000)

    setTimeout(() => {
        socket.emit('server-send-set-cycle-time', '{"cycle-time":3000}')
    }, 19000)

    setTimeout(() => {
        socket.emit('server-send-script', '{"temperature":29.5}')
    }, 20000)

    setTimeout(() => {
        socket.emit('server-send-control-manual-or-auto', '{"is-auto":true}')
    }, 21000)
})

client.on('connection', socket => {
    client.emit('server-send-ack-connection', '[Client]Connected to server.')
    socket.emit('server-send-ack-connection', 'Connected to server.')

    socket.on('client-send-message', message => {
        console.log(message);
    })

    setInterval(() => {
        socket.emit('server-send-message', 'Hi Client.')
    }, 3000)
})

setTimeout(() => {
    Machine.findAll()
        .then(machines => {
            console.log('Machine All: ', machines);
            if (machines) {
                machines.forEach(machine => {
                    updateMachineList({ code: machine.code, status: 'off' }, machineList)
                })
            }
        })
}, 5000)
//////////////////////////////////////////////////////////////
const checkMachine = async (code) => {
    if (Machine) {
        const result = await Machine.findOne({ where: { code: code } })
        return result
    } else {
        return undefined
    }

}

const updateMachineList = async (ms, machineList) => {
    const result = await checkMachine(ms.code)

    if (result !== null && result !== undefined) {
        const machine = {
            id: result.machine_id,
            name: result.name,
            code: result.code,
            status: ms.status,
            session_id: null,
            statusDevice: {
                eFan: false,
                bFan: false,
                heater: false,
                sensor: {
                    dht: {
                        dht1: false,
                        dht2: false,
                        dht3: false
                    },
                    currentSensor: false
                }
            }
        }

        if (findIndexOfMachineInList(ms.code, machineList) !== -1) {
            machineList.splice(findIndexOfMachineInList(ms.code, machineList), 1)
        }

        machineList.push(machine)
        return true
    } else {
        return false
    }
}

const updateStatusDeviceOfMachineInList = async (ms, machineList) => {
    const index = findIndexOfMachineInList(ms.code, machineList)
    const obj = machineList[index]

    if (obj) {
        const statusDevice = obj.statusDevice
        statusDevice.eFan = ms['eFan']
        statusDevice.bFan = ms['bFan']
        statusDevice.heater = ms.heater

        const sensor = statusDevice.sensor
        sensor.currentSensor = ms.current !== 0 ? true : false

        const dht = sensor.dht
        dht.dht1 = ms.dht1 !== '-1' ? true : false
        dht.dht2 = ms.dht2 !== '-1' ? true : false
        dht.dht3 = ms.dht3 !== '-1' ? true : false

        return true
    } else {
        return false
    }
}

const MachineListFunction = {
    checkMachine: checkMachine,
    updateMachineList: updateMachineList,
    updateStatusDeviceOfMachineInList: updateStatusDeviceOfMachineInList
}

module.exports = MachineListFunction
/////////////////////////////////////////////////////////////
// Require routes
const UserRoute = require('./routes/users/UserRoute')
const ScriptRoute = require('./routes/scripts/ScriptRoute')
const MachineRoute = require('./routes/machines/MachineRoute')
const DHTRoute = require('./routes/dhts/DHTRoute')
const CurrentSensorRoute = require('./routes/current_sensors/CurrentSensorRoute')
const SessionRoute = require('./routes/sessions/SessionRoute')

// Setup
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

const config = {
    origin: ORIGIN,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin', 'Accept'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    optionSuccessStatus: 200
}
app.use(cors(config))

// Routing
// Home page
app.get('/', (req, res) => {
    console.log('Cookies: ', req.cookies)

    console.log('Signed Cookies: ', req.signedCookies)

    res.send('Welcome NodeJS')
})

// User path
app.use('/api/user', UserRoute)

// Script path
app.use('/api/script', ScriptRoute)

// Machine path
app.use('/api/machine', MachineRoute)

// DHT11 path
app.use('/api/dht', DHTRoute)

// Current sensor path
app.use('/api/current-sensor', CurrentSensorRoute)

// Session path
app.use('/api/session', SessionRoute)

// Server is listening clients
server.listen(PORT, HOST_NAME, () => {
    let announcement = {
        server: server.address(),
        address: ip.address(),
        message: 'Server is running!'
    }
    console.log(announcement)
})