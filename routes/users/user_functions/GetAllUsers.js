const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { User } = require("../../../database/Models")

const ADMIN = 'admin'
const MANAGER = 'manager'

const getAllUsers = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN || payload.role === MANAGER) {
            response.isValid = true
            response.message = 'Get all of users success.'

            // Wait querying database until it is finished
            /*
                Parameters:
                    username
                SQL:
                    SELECT * FROM company.user;
            */
            await User.findAll({
                attributes: [
                    'first_name',
                    'last_name',
                    'gender',
                    'date_of_birth',
                    'phone_number',
                    'address',
                    'email',
                    'role',
                    'create_at'
                ]
            })
                .then(users => {
                    response.isSuccess = true
                    response.users = users
                })
                .catch(err => {
                    response.message = `Error: ${err.message}`
                })
        } else {
            response.message = 'This account does not access the source'
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, users, message
    res.json(response)
}

exports.getAllUsers = getAllUsers