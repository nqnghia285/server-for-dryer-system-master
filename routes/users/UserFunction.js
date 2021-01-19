const { checkUser } = require('./user_functions/CheckUser')
const { deleteUser } = require('./user_functions/Delete')
const { getAllUsers } = require('./user_functions/GetAllUsers')
const { getProfile } = require('./user_functions/GetProfile')
const { isUserExist } = require('./user_functions/IsUserExist')
const { login } = require('./user_functions/Login')
const { logout } = require('./user_functions/Logout')
const { registerUser } = require('./user_functions/Register')
const { updateUser } = require('./user_functions/Update')

const UserFunction = {
    isUserExist: isUserExist,
    checkUser: checkUser,
    login: login,
    getAllUsers: getAllUsers,
    registerUser: registerUser,
    getProfile: getProfile,
    updateUser: updateUser,
    deleteUser: deleteUser,
    logout: logout
}

module.exports = UserFunction