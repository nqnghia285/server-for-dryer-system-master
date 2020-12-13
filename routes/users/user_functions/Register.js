const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { hashPWD } = require("../../../common_functions/SystemFunction")
const { User } = require("../../../database/Models")
const { isUserExist } = require("./IsUserExist")

const ADMIN = 'admin'

// Rigister user
const registerUser = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true
            let flag = await createUser(req)
            if (flag) {
                response.isSuccess = true
                response.message = `The ${req.body.username} was registered.`
            } else {
                response.isSuccess = false
                response.message = 'The username existed or inserting user into database is failed'
            }
        } else {
            response.message = 'This account does not access the source'
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

const createUser = async (req) => {
    const user = {
        first_name,
        last_name,
        gender,
        date_of_birth,
        phone_number,
        address,
        username,
        password,
        role
    } = req.body

    let isSuccess = false

    // Check username exist
    let flag = await isUserExist(user.username)
    if (!flag) {
        user.password = hashPWD(user.password)
        if (user.password === undefined) {
            return false
        }

        await User.create(user)
            .then(() => {
                isSuccess = true
            })
            .catch(err => {
            })
    }

    return isSuccess
}

exports.registerUser = registerUser