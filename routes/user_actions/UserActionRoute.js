const express = require('express')
const UserActionRoute = express.Router()

const { controlDevices, controlManualOrAuto, setCycleTime, controlMachine } = require('./UserActionFunction')

// Control devices action
UserActionRoute.post('/control-devices/', (req, res) => {
    controlDevices(req, res)
})

// Control manual or auto action
UserActionRoute.post('/control-manual-or-auto', (req, res) => {
    controlManualOrAuto(req, res)
})

// Set cycle time
UserActionRoute.post('/set-cycle-time', (req, res) => {
    setCycleTime(req, res)
})

// Control machine
UserActionRoute.post('/control-machine', (req, res) => {
    controlMachine(req, res)
})


module.exports = UserActionRoute