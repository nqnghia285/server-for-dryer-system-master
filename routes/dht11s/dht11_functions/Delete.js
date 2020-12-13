const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { DHT11 } = require("../../../database/Models")

const ADMIN = 'admin'

const deleteDHT11 = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            let dht11DB = await DHT11.findOne({ where: { dht11_id: req.body.dht11_id } })

            if (dht11DB !== null) {
                await dht11DB.destroy()
                    .then(() => {
                        response.isSuccess = true
                        response.message = `You deleted a dht11 has dht11_id: ${req.body.dht11_id}.`
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `Do not find dht11 has dht11_id: ${req.body.dht11_id}`
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

exports.deleteDHT11 = deleteDHT11