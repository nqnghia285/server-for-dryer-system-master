const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { Script } = require('../../../database/Models')

const getAllScripts = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        await Script.findAll()
            .then(scripts => {
                response.isSuccess = true
                response.scripts = scripts
                response.message = 'Get all of scripts success.'
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

exports.getAllScripts = getAllScripts