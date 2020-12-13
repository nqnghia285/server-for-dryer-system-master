const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { Machine } = require('../../../database/Models')

const getAllMachines = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        await Machine.findAll()
            .then(machines => {
                response.isSuccess = true
                response.machines = machines
                response.message = 'Get all of machines success.'
            })
            .catch(err => {
                response.message = `Error: ${err.message}`
            })
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, users, message
    res.json(response)
}

exports.getAllMachines = getAllMachines