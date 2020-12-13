require('dotenv').config()
// require('./database/InsertTemplates')

const express = require('express')
const app = express()

const PORT = process.env.SERVER_PORT
const ORIGIN = process.env.ORIGIN
const HOST_NAME = process.env.HOST_NAME
const server = require("http").Server(app)

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cors = require('cors')

const bodyParser = require('body-parser')
const { json, urlencoded } = require('body-parser')
const cookieParser = require('cookie-parser')

const ip = require('ip')

// Require routes
const UserRoute = require('./routes/users/UserRoute')
const ScriptRoute = require('./routes/scripts/ScriptRoute')
const MachineRoute = require('./routes/machines/MachineRoute')
const DHT11Route = require('./routes/dht11s/DHT11Route')
const CurrentSensorRoute = require('./routes/current_sensors/CurrentSensorRoute')

// Setup
app.use(json())
app.use(urlencoded({ extended: false }))
app.use(cookieParser())

const config = {
    'origin': ORIGIN,
    'allowedHeaders': ['Content-Type', 'Authorization', 'Accept'],
    'credentials': true,
    'methods': ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    'optionSuccessStatus': 200
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
app.use('/api/user/', UserRoute)

// Script path
app.use('/api/script/', ScriptRoute)

// Machine path
app.use('/api/machine/', MachineRoute)

// DHT11 path
app.use('/api/dht11/', DHT11Route)

// Current sensor path
app.use('/api/current-sensor/', CurrentSensorRoute)

// Server is listening clients
server.listen(PORT, HOST_NAME, () => {
    let announcement = {
        server: server.address(),
        address: ip.address(),
        message: 'Server is running!'
    }
    console.log(announcement)
})