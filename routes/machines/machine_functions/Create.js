const { Machine } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { updateMachineList } = require("../../../server")

const ADMIN = 'admin'

const createMachine = async (req, res) => {
    // Global variables of app
    const { machineList, client } = req.app.locals
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true
            let machine = {
                name, description, code, position
            } = req.body

            await Machine.create(machine)
                .then(async () => {
                    response.isSuccess = true
                    response.message = 'Create machine success.'
                    await updateMachineList({ code: machine.code, status: 'off' }, machineList)
                    client.emit('server-send-update-machine-list', { machineList: machineList })
                })
                .catch(err => {
                    response.message = `Error: ${err.message}`
                })
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

exports.createMachine = createMachine