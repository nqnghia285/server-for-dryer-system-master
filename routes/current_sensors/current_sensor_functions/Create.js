const { CurrentSensor } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")

const ADMIN = 'admin'

const createCurrentSensor = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true
            let currentSensor = {
                current_range: req.body.current_range,
                current_accuracy: req.body.current_accuracy,
                name: req.body.name,
                description: req.body.description,
                machine_id: req.body.machine_id
            }

            await CurrentSensor.create(currentSensor)
                .then(() => {
                    response.isSuccess = true
                    response.message = 'Create currentSensor success'
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

exports.createCurrentSensor = createCurrentSensor