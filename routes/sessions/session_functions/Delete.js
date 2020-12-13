const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { Session } = require("../../../database/Models")

const ADMIN = 'admin'

const deleteSession = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            let sessionDB = await Session.findOne({ where: { session_id: req.body.session_id } })

            if (sessionDB !== null) {
                await sessionDB.destroy()
                    .then(() => {
                        response.isSuccess = true
                        response.message = `You deleted a session has session_id: ${req.body.session_id}.`
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `The session has session_id: ${req.body.session_id} do not exist in database.`
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

exports.deleteSession = deleteSession