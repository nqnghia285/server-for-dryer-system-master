const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { CurrentSensor } = require('../../../database/Models')

const ADMIN = 'admin'

const getAllCurrentSensors = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            await CurrentSensor.findAll()
                .then(currentSensors => {
                    response.isSuccess = true
                    response.message = 'Get all of current sensors success.'
                    response.currentSensors = currentSensors
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
    // Params: isValid, isSuccess, users, message
    res.json(response)
}

exports.getAllCurrentSensors = getAllCurrentSensors