const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { Machine } = require("../../../database/Models")

const ADMIN = 'admin'

const deleteMachine = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            let machineDB = await Machine.findOne({ where: { machine_id: req.body.machine_id } })

            if (machineDB !== null) {
                await machineDB.destroy()
                    .then(() => {
                        response.isSuccess = true
                        response.message = `You deleted a machine has machine_id: ${req.body.machine_id}.`
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `Do not find machine has machine_id: ${req.body.machine_id}`
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

exports.deleteMachine = deleteMachine