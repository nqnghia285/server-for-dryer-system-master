const { authenticateUserFromReq } = require("../../authentication/Auth")

const controlDevices = async (req, res) => {
    // Global variables of app
    const io = req.app.locals.io
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const message = { code, eFan, bFan, heater } = req.body

    console.log(message);

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        if (message.code !== undefined &&
            message.eFan !== undefined &&
            message.bFan !== undefined &&
            message.heater !== undefined) {

            response.isSuccess = true
            io.emit('server-send-control-device', JSON.stringify(message))
        } else {
            response.message = 'Parameters are invalid.'
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

exports.controlDevices = controlDevices