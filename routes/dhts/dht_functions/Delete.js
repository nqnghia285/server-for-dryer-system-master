const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { DHT } = require("../../../database/Models")

const ADMIN = 'admin'

const deleteDHT = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            let dhtDB = await DHT.findOne({ where: { dht_id: req.body.dht_id } })

            if (dhtDB !== null) {
                await dhtDB.destroy()
                    .then(() => {
                        response.isSuccess = true
                        response.message = `You deleted a dht has dht_id: ${req.body.dht_id}.`
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `Do not find dht has dht_id: ${req.body.dht_id}`
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

exports.deleteDHT = deleteDHT