const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { CurrentSensor } = require('../../../database/Models')

const ADMIN = 'admin'

const updateCurrentSensor = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            const currentSensor = {
                current_sensor_id, current_range, current_accuracy, name, description, machine_id
            } = req.body

            let currentSensorDB = await CurrentSensor.findOne({ where: { current_sensor_id: currentSensor.current_sensor_id } })

            if (currentSensorDB !== null) {
                await currentSensorDB.update(currentSensor)
                    .then(() => {
                        response.isSuccess = true
                        response.message = 'Update current sensor success'
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `The current sensor has current_sensor_id: ${currentSensor.current_sensor_id} do not exist in database.`
            }
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

exports.updateCurrentSensor = updateCurrentSensor