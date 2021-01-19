const express = require('express')
const UserRoute = express.Router()

const { login, logout, getAllUsers, registerUser, checkUser, getProfile, updateUser, deleteUser } = require('./UserFunction')

// Register user
UserRoute.post('/register/', (req, res) => {
    registerUser(req, res)
})

// Check if user exist
UserRoute.post('/check-user/', (req, res) => {
    checkUser(req, res)
})

// Login
UserRoute.post('/login/', (req, res) => {
    login(req, res)
})

// Get all of users
UserRoute.get('/get-all-of-users/', (req, res) => {
    getAllUsers(req, res)
})

// Get profile
UserRoute.get('/get-profile/', (req, res) => {
    getProfile(req, res)
})

// Update user
UserRoute.put('/update/', (req, res) => {
    updateUser(req, res)
})

// Delete user
UserRoute.delete('/delete/', (req, res) => {
    deleteUser(req, res)
})

// Logout
UserRoute.delete('/logout/', (req, res) => {
    logout(req, res)
})

module.exports = UserRoute

