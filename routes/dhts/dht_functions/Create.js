const { DHT } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")

const ADMIN = 'admin'

const createDHT = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true
            let dht = {
                temperature_range: req.body.temperature_range,
                temperature_accuracy: req.body.temperature_accuracy,
                humidity_range: req.body.humidity_range,
                humidity_accuracy: req.body.humidity_accuracy,
                name: req.body.name,
                description: req.body.description,
                machine_id: req.body.machine_id
            }

            await DHT.create(dht)
                .then(() => {
                    response.isSuccess = true
                    response.message = 'Create dht success'
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

exports.createDHT = createDHT