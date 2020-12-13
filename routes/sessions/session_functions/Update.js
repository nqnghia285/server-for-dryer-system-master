const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { Session } = require('../../../database/Models')

const ADMIN = 'admin'

const updateSession = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            const session = {
                name: req.body.name,
                result: req.body.result
            }

            let sessionDB = await Session.findOne({ where: { session_id: req.body.session_id } })

            if (sessionDB !== null) {
                await sessionDB.update(session)
                    .then(() => {
                        response.isSuccess = true
                        response.message = 'Update session success'
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

exports.updateSession = updateSession