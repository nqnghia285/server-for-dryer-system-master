require('dotenv').config()

const express = require('express')
const app = express()

const PORT = process.env.PORT
const ORIGIN = process.env.ORIGIN
const HOST_NAME = process.env.HOST_NAME
const server = require("http").Server(app)

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const cors = require('cors')
const bodyParser = require('body-parser')
const { json, urlencoded } = require('body-parser')
const ip = require('ip')

// Require routes


// Setup
app.use(json())
app.use(urlencoded({ extended: false }))

const config = {
    'origin': ORIGIN,
    'allowedHeaders': ['Content-Type', 'Authorization'],
    'credentials': true,
    'methods': ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
    'optionSuccessStatus': 200
}
app.use(cors(config))

// Routing
// Home page
app.get('/', (req, res) => {
    res.send('Welcome NodeJS')
})

// Employee page
app.use('/api/employee/', EmployeeRoute)

// User page
app.use('/api/user/', UserRoute)

// Server is listening clients
server.listen(PORT, HOST_NAME, () => {
    let announcement = {
        server: server.address(),
        address: ip.address(),
        message: 'Server is running!'
    }
    console.log(announcement)
})