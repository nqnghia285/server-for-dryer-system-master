const { authenticateUserFromReq } = require("../../authentication/Auth")

const ADMIN = 'admin'
const EMPLOYEE = 'employee'

const setCycleTime = async (req, res) => {
    // Global variables of app
    const io = req.app.locals.io
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const message = { code, cycleTime } = req.body

    console.log(message);

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN || payload.role === EMPLOYEE) {
            response.isValid = true

            if (message.code !== undefined &&
                message.cycleTime !== undefined) {

                response.isSuccess = true
                io.emit('server-send-set-cycle-time', JSON.stringify(message))
            } else {
                response.message = 'Parameters are invalid.'
            }
        } else {
            response.message = 'This account does not have this permission'
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

exports.setCycleTime = setCycleTime