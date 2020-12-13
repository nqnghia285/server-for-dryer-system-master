const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { User } = require("../../../database/Models")

const ADMIN = 'admin'

const deleteUser = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true
        response.isSuccess = false
        if (payload.role === ADMIN) {

            let userDB = await User.findOne({ where: { user_id: req.body.user_id } })

            if (userDB !== null) {
                await userDB.destroy()
                    .then(() => {
                        response.isSuccess = true
                        response.message = `You deleted a account has user_id: ${req.body.user_id}.`
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            }
        } else {
            response.isSuccess = false
            response.message = 'This account does not have this permission'
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

exports.deleteUser = deleteUser