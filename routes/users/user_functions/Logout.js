const { User } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { removeUser } = require('../../../common_functions/SystemFunction')

const logout = async (req, res) => {
    // Global variables of app
    const userList = req.app.locals.userList
    const client = req.app.locals.client
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        if (removeUser(userList, payload.user_id)) {
            console.log('Logout userlist: ', userList);
            response.isSuccess = true
            client.emit('server-send-update-user-list', { userList: userList })

            // Insert token into cookie
            res.cookie(
                'token',
                'Invalid',
                {
                    domain: 'localhost',
                    maxAge: 0,
                    secure: false, // Set true if your using https
                    httpOnly: true // Set true to prevent any script codes access it from client
                }
            )
        } else {
            response.message = 'Logout failed.'
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

exports.logout = logout