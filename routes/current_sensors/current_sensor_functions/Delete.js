const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { CurrentSensor } = require("../../../database/Models")

const ADMIN = 'admin'

const deleteCurrentSensor = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            let currentSensorDB = await CurrentSensor.findOne({ where: { current_sensor_id: req.body.current_sensor_id } })

            if (currentSensorDB !== null) {
                await currentSensorDB.destroy()
                    .then(() => {
                        response.isSuccess = true
                        response.message = `You deleted a current sensor has current_sensor_id: ${req.body.current_sensor_id}.`
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `Do not find current sensor has current_sensor_id: ${req.body.current_sensor_id}`
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

exports.deleteCurrentSensor = deleteCurrentSensor