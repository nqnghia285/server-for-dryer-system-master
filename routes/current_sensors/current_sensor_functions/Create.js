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

            const currentSensor = {
                current_range, current_accuracy, name, description, machine_id
            } = req.body

            await CurrentSensor.create(currentSensor)
                .then(() => {
                    response.isSuccess = true
                    response.message = 'Create current sensor success'
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