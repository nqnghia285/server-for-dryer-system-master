const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { DHT } = require('../../../database/Models')

const ADMIN = 'admin'

const updateDHT = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            const dht = {
                dht_id, temperature_range, temperature_accuracy, humidity_range, humidity_accuracy, name, description, machine_id
            } = req.body

            let dhtDB = await DHT.findOne({ where: { dht_id: dht.dht_id } })

            if (dhtDB !== null) {
                await dhtDB.update(dht)
                    .then(() => {
                        response.isSuccess = true
                        response.message = 'Update dht success'
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `The machine has dht_id: ${req.body.dht_id} do not exist in database.`
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

exports.updateDHT = updateDHT