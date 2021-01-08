const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { DHT } = require('../../../database/Models')

const ADMIN = 'admin'

const getAllDHTs = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            await DHT.findAll()
                .then(dhts => {
                    response.isSuccess = true
                    response.dhts = dhts
                    response.message = 'Get all of dhts success.'
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

exports.getAllDHTs = getAllDHTs