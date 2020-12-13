const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { DHT11 } = require('../../../database/Models')

const ADMIN = 'admin'

const getAllDHT11s = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            await DHT11.findAll()
                .then(dht11s => {
                    response.isSuccess = true
                    response.dht11s = dht11s
                    response.message = 'Get all of dht11s success.'
                })
                .catch(err => {
                    response.message = `Error: ${err.message}`
                })
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

exports.getAllDHT11s = getAllDHT11s