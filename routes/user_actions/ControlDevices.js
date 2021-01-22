const { authenticateUserFromReq } = require("../../authentication/Auth")
const { findIndexOfMachineInList } = require("../../common_functions/SystemFunction")
const { updateStatusDeviceOfMachineInList } = require("../../server")

const controlDevices = async (req, res) => {
    // Global variables of app
    const { io, machineList } = req.app.locals

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

            const index = findIndexOfMachineInList(code, machineList)
            if (index !== -1 && machineList[index].status === 'running') {
                response.isSuccess = true

                updateStatusDeviceOfMachineInList(message, machineList)
                io.emit('server-send-control-device', JSON.stringify(message))
            } else {
                response.message = 'The machine is not running.'
            }
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