const express = require('express')
const CurrentSensorRoute = express.Router()

const { createCurrentSensor, deleteCurrentSensor, updateCurrentSensor, getAllCurrentSensors } = require('./CurrentSensorFunction')

// Create current sensor
CurrentSensorRoute.post('/create/', (req, res) => {
    createCurrentSensor(req, res)
})

// Delete current sensor
CurrentSensorRoute.post('/delete/', (req, res) => {
    deleteCurrentSensor(req, res)
})

// Update current sensor
CurrentSensorRoute.post('/update/', (req, res) => {
    updateCurrentSensor(req, res)
})

// Get all of current sensors
CurrentSensorRoute.get('/get-all-of-current-sensors', (req, res) => {
    getAllCurrentSensors(req, res)
})

module.exports = CurrentSensorRoute