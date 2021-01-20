const express = require('express')
const ScriptRoute = express.Router()

const { createScript, deleteScript, getAllScripts, updateScript } = require('./ScriptFunction')

// Create
ScriptRoute.post('/create/', (req, res) => {
    createScript(req, res)
})

// Delete
ScriptRoute.post('/delete/', (req, res) => {
    deleteScript(req, res)
})

// Get all of scripts
ScriptRoute.get('/get-all-of-scripts/', (req, res) => {
    getAllScripts(req, res)
})

// Update script
ScriptRoute.post('/update/', (req, res) => {
    updateScript(req, res)
})

module.exports = ScriptRoute