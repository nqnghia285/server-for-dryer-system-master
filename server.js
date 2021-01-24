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
const { createData } = require('./routes/datas/DataFunction')
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

        console.log('mcu-send-data', message);

        let index = findIndexOfMachineInList(message.code, machineList)
        let machine = machineList[index]
        createData(machine, message)

        await updateStatusDeviceOfMachineInList(message, machineList)

        // machineList.forEach(obj => {
        //     console.log(obj.code);
        //     console.log(obj.status);
        //     console.log(obj.statusDevices);
        //     console.log(obj.statusSensors);
        // })

        // Send machineList to all Clients
        client.emit('server-send-update-machine-list', { machineList: machineList })

        // Send data
        client.emit('server-send-data', { data: fullDataParser(message) })

        // console.log(JSON.parse(message))
        // socket.emit('server-send-control', '{"message":"Hello [NodeMCU 12E]."}')
    })

    // Listener 'mcu-send-ack-control-machine'
    socket.on('mcu-send-ack-control-machine', message => {
        console.log('mcu-send-ack-control-machine', message);
        client.emit('server-send-update-machine-list', { machineList: machineList })
    })

    // Listener 'mcu-send-ack-control-device'
    socket.on('mcu-send-ack-control-device', message => {
        console.log('mcu-send-ack-control-device', message);
        // client.emit('server-send-ack-control-devices', message)
        client.emit('server-send-update-machine-list', { machineList: machineList })
    })

    // Listener 'mcu-send-ack-set-cycle-time'
    socket.on('mcu-send-ack-set-cycle-time', message => {
        console.log('mcu-send-ack-set-cycle-time', message);
        client.emit('server-send-ack-set-cycle-time', message)
    })

    // Listener 'mcu-send-ack-script'
    socket.on('mcu-send-ack-script', message => {
        console.log('mcu-send-ack-script', message);
    })

    // Listener 'mcu-send-ack-control-manual-or-auto'
    socket.on('mcu-send-ack-control-manual-or-auto', message => {
        console.log('mcu-send-ack-control-manual-or-auto', message);
    })

    // Listener 'mcu-send-ready'
    socket.on('mcu-send-ready', async message => {
        console.log('mcu-send-ready', message);

        await updateMachineList(message, machineList)
        console.log('Update machineList - mcu-send-ready:', machineList);

        // Send machineList to all Clients
        client.emit('server-send-update-machine-list', { machineList: machineList })
    })

    // Listener 'mcu-send-ack-finish-session'
    socket.on('mcu-send-ack-finish-session', message => {
        console.log('mcu-send-ack-finish-session', message);
        let { code, isSuccess } = message

        if (isSuccess !== undefined && code !== undefined && isSuccess) {
            console.log('rest machine: ', resetMachine(code, machineList));

            client.emit('server-send-notice-finish-session', `{"code":"${code}"}`)
        }
    })

    // Listener 'disconnect'
    socket.on('disconnect', message => {
        console.log('disconnect', message)
        socket.disconnect()
    })
})

client.on('connection', socket => {
    client.emit('server-send-ack-connection', '[Client]Connected to server.')
    socket.emit('server-send-ack-connection', 'Connected to server.')

    socket.on('client-send-message', message => {
        console.log('client-send-message', message);
    })
})

// Truy cap xuong DB va cap nhat machineList
setTimeout(() => {
    Machine.findAll()
        .then(machines => {
            if (machines.length > 0) {
                machines.forEach(machine => {
                    updateMachineList({ code: machine.code, status: 'off' }, machineList)
                })
                console.log('Update machineList - Start: ', machineList);
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
            finishTime: 0,
            statusDevices: {
                eFan: false,
                bFan: false,
                heater: false
            },
            statusSensors: {
                dhts: {
                    dht1: false,
                    dht2: false,
                    dht3: false
                },
                currentSensor: false
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
        const { statusDevices, statusSensors } = obj
        statusDevices.eFan = ms['eFan']
        statusDevices.bFan = ms['bFan']
        statusDevices.heater = ms.heater

        statusSensors.currentSensor = ms.current !== 0 ? true : false

        const { dhts } = statusSensors
        dhts.dht1 = ms.dht1 !== '-1' ? true : false
        dhts.dht2 = ms.dht2 !== '-1' ? true : false
        dhts.dht3 = ms.dht3 !== '-1' ? true : false

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
const resetMachine = (code, machineList) => {
    const index = findIndexOfMachineInList(code, machineList)
    if (index !== -1) {
        const machine = machineList[index]
        machine.status = 'on'
        machine.session_id = null
        machine.finishTime = 0

        const { statusDevices, statusSensors } = machine
        statusDevices.eFan = false
        statusDevices.bFan = false
        statusDevices.heater = false
        statusSensors.currentSensor = false
        statusSensors.dhts.dht1 = false
        statusSensors.dhts.dht2 = false
        statusSensors.dhts.dht3 = false
        return true
    } else {
        return false
    }
}

// Interval check finish session
setInterval(() => {
    let now = new Date()
    machineList.forEach((machine, i) => {
        if (machine.status === 'running') {
            let finishTime = machine.finishTime
            if (finishTime <= now.getTime()) {
                io.emit('server-send-finish-session', `{"code":"${machine.code}"}`)
            }
        }
    })
}, 5000);

/////////////////////////////////////////////////////////////
// Require routes
const UserRoute = require('./routes/users/UserRoute')
const ScriptRoute = require('./routes/scripts/ScriptRoute')
const MachineRoute = require('./routes/machines/MachineRoute')
const DHTRoute = require('./routes/dhts/DHTRoute')
const CurrentSensorRoute = require('./routes/current_sensors/CurrentSensorRoute')
const SessionRoute = require('./routes/sessions/SessionRoute')
const UserActionRoute = require('./routes/user_actions/UserActionRoute')
const { fullDataParser } = require('./routes/datas/data_functions/DataParser')

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

// User action path
app.use('/api/user-action', UserActionRoute)

// Server is listening clients
server.listen(PORT, HOST_NAME, () => {
    let announcement = {
        server: server.address(),
        address: ip.address(),
        message: 'Server is running!'
    }
    console.log(announcement)
})