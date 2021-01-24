const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { Session } = require('../../../database/Models')

const ADMIN = 'admin'
const EMPLOYEE = 'employee'
const MANAGER = 'manager'

const getAllSessions = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN || payload.role === MANAGER) {
            response.isValid = true

            await Session.findAll()
                .then(sessions => {
                    response.isSuccess = true
                    response.sessions = sessions
                    response.message = 'Get all of sessions success.'
                })
                .catch(err => {
                    response.message = `Error: ${err.message}`
                })
        } else if (payload.role === EMPLOYEE) {
            await Session.findAll({ where: { user_id: payload.user_id } })
                .then(sessions => {
                    response.isSuccess = true
                    response.sessions = sessions
                    response.message = 'Get all of sessions success.'
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

exports.getAllSessions = getAllSessions