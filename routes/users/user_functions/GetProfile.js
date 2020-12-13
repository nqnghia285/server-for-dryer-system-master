const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { User } = require("../../../database/Models")

const getProfile = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true
        await User.findOne({ where: { user_id: payload.user_id } })
            .then(userDB => {
                response.isSuccess = true
                const user = {
                    first_name: userDB.first_name,
                    last_name: userDB.last_name,
                    gender: userDB.gender,
                    date_of_birth: userDB.date_of_birth,
                    phone_number: userDB.phone_number,
                    address: userDB.address,
                    username: userDB.username,
                    role: userDB.role
                }
                response.user = user
            })
            .catch(err => {
                response.isSuccess = false
                response.message = `Error: ${err.message}`
            })
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, user, message
    res.json(response)
}

exports.getProfile = getProfile