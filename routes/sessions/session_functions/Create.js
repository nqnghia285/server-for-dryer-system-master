const { Session } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")

const createSession = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true
        let session = {
            user_id: payload.user_id,
            script_id: req.body.script_id,
            machine_id: req.body.machine_id
        }

        await Session.create(session)
            .then(() => {
                response.isSuccess = true
                response.message = 'Create session success'
            })
            .catch(err => {
                response.message = `Error: ${err.message}`
            })
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

exports.createSession = createSession