const express = require('express')
const UserActionRoute = express.Router()

const { controlDevices, controlManualOrAuto } = require('./UserActionFunction')

// Control devices action
UserActionRoute.post('/control-devices/', (req, res) => {
    controlDevices(req, res)
})

// Control manual or auto action
UserActionRoute.post('/control-manual-or-auto', (req, res) => {
    controlManualOrAuto(req, res)
})



module.exports = UserActionRoute