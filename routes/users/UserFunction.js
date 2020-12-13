const { checkUser } = require('./user_functions/CheckUser')
const { deleteUser } = require('./user_functions/Delete')
const { getAllUsers } = require('./user_functions/GetAllUsers')
const { getProfile } = require('./user_functions/GetProfile')
const { isUserExist } = require('./user_functions/IsUserExist')
const { login } = require('./user_functions/Login')
const { registerUser } = require('./user_functions/Register')
const { updateUser } = require('./user_functions/Update')

const UserFunction = {}

UserFunction.isUserExist = isUserExist
UserFunction.checkUser = checkUser
UserFunction.login = login
UserFunction.getAllUsers = getAllUsers
UserFunction.registerUser = registerUser
UserFunction.getProfile = getProfile
UserFunction.updateUser = updateUser
UserFunction.deleteUser = deleteUser

module.exports = UserFunction