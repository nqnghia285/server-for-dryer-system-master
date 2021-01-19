const { Session, Machine, Script } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { findIndexOfMachineInList } = require("../../../common_functions/SystemFunction")

const controlMachine = async (req, res) => {
    // Global variables of app
    const machineList = req.app.locals.machineList
    const client = req.app.locals.client
    const io = req.app.locals.io
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        const machine = machineList[findIndexOfMachineInList(req.body.code, machineList)]

        if (req.body.status === 'on') {

        }
    }
}

exports.controlMachine = controlMachine