const express = require('express')
const MachineRoute = express.Router()

const { createMachine, deleteMachine, getAllMachines, updateMachine, getMachineInfo } = require('./MachineFunction')

// Create machine
MachineRoute.post('/create', (req, res) => {
    createMachine(req, res)
})

// Delete machine
MachineRoute.post('/delete', (req, res) => {
    deleteMachine(req, res)
})

// Get all of machines
MachineRoute.post('/get-machine-info', (req, res) => {
    getMachineInfo(req, res)
})

// Get all of machines
MachineRoute.get('/get-all-of-machines', (req, res) => {
    getAllMachines(req, res)
})

// Update machine
MachineRoute.post('/update', (req, res) => {
    updateMachine(req, res)
})

module.exports = MachineRoute