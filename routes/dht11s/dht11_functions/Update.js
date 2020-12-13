const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { DHT11 } = require('../../../database/Models')

const ADMIN = 'admin'

const updateDHT11 = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            const dht11 = {
                temperature_range: req.body.temperature_range,
                temperature_accuracy: req.body.temperature_accuracy,
                humidity_range: req.body.humidity_range,
                humidity_accuracy: req.body.humidity_accuracy,
                name: req.body.name,
                description: req.body.description,
                machine_id: req.body.machine_id
            }

            let dht11DB = await DHT11.findOne({ where: { dht11_id: req.body.dht11_id } })

            if (dht11DB !== null) {
                await dht11DB.update(dht11)
                    .then(() => {
                        response.isSuccess = true
                        response.message = 'Update dht11 success'
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `The machine has dht11_id: ${req.body.dht11_id} do not exist in database.`
            }
        } else {
            response.message = 'This account does not access the source'
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, users, message
    res.json(response)
}

exports.updateDHT11 = updateDHT11