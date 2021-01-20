const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { findIndexOfMachineInList } = require("../../../common_functions/SystemFunction")
const { Machine } = require("../../../database/Models")

const ADMIN = 'admin'

const deleteMachine = async (req, res) => {
    // Global variables of app
    const { machineList, client } = req.app.locals
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const { machine_id } = req.body

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            let machineDB = await Machine.findOne({ where: { machine_id: machine_id } })

            if (machineDB !== null) {
                const code = machineDB.code
                await machineDB.destroy()
                    .then(() => {
                        response.isSuccess = true
                        response.message = `You deleted a machine has machine_id: ${machine_id}.`
                        machineList.splice(findIndexOfMachineInList(code, machineList), 1)
                        client.emit('server-send-update-machine-list', { machineList: machineList })
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `Do not find machine has machine_id: ${machine_id}`
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

exports.deleteMachine = deleteMachine