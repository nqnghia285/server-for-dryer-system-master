const express = require('express')
const DHTRoute = express.Router()

const { createDHT, deleteDHT, getAllDHTs, updateDHT } = require('./DHTFunction')

// Create dht
DHTRoute.post('/create/', (req, res) => {
    createDHT(req, res)
})

// Delete dht
DHTRoute.post('/delete/', (req, res) => {
    deleteDHT(req, res)
})

// Get all of dhts
DHTRoute.get('/get-all-of-dhts', (req, res) => {
    getAllDHTs(req, res)
})

// Update dht
DHTRoute.post('/update/', (req, res) => {
    updateDHT(req, res)
})

module.exports = DHTRoute