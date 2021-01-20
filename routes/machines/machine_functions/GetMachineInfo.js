const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { Machine } = require('../../../database/Models')

const getMachineInfo = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false
    const { machine_id } = req.body

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        await Machine.findOne({ where: { machine_id: machine_id } })
            .then(machine => {
                response.isSuccess = true
                response.machine = machine
                response.message = 'Get machine info success.'
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

exports.getMachineInfo = getMachineInfo