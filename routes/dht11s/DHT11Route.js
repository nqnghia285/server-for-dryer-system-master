const express = require('express')
const DHT11Route = express.Router()

const { createDHT11, deleteDHT11, getAllDHT11s, updateDHT11 } = require('./DHT11Function')

// Create dht11
DHT11Route.post('/create/', (req, res) => {
    createDHT11(req, res)
})

// Delete dht11
DHT11Route.delete('/delete/', (req, res) => {
    deleteDHT11(req, res)
})

// Get all of dht11s
DHT11Route.get('/get-all-of-dht11s', (req, res) => {
    getAllDHT11s(req, res)
})

// Update dht11
DHT11Route.put('/update/', (req, res) => {
    updateDHT11(req, res)
})

module.exports = DHT11Route