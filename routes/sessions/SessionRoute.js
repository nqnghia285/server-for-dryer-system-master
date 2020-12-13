const express = require('express')
const SessionRoute = express.Router()

const { createSession, deleteSession, updateSession, getAllSessions } = require('./SessionFunction')

// Create session
SessionRoute.post('/create/', (req, res) => {
    createSession(req, res)
})

// Delete session
SessionRoute.delete('/delete/', (req, res) => {
    deleteSession(req, res)
})

// Update session
SessionRoute.put('/update/', (req, res) => {
    updateSession(req, res)
})

// Get all of sessions
SessionRoute.get('/get-all-of-sessions', (req, res) => {
    getAllSessions(req, res)
})

module.exports = SessionRoute