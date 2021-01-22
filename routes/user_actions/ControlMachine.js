const { authenticateUserFromReq } = require("../../authentication/Auth")
const { updateMachineList } = require("../../server")

const ADMIN = 'admin'
const EMPLOYEE = 'employee'

const controlMachine = async (req, res) => {
    // Global variables of app
    const { io, machineList } = req.app.locals

    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const message = { code, status } = req.body

    console.log(message);

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN || payload.role === EMPLOYEE) {
            response.isValid = true

            if (message.code !== undefined &&
                message.status !== undefined) {

                response.isSuccess = true

                updateMachineList(message, machineList)
                io.emit('server-send-control-machine', JSON.stringify(message))
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

exports.controlMachine = controlMachine