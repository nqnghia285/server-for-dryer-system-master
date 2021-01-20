const { Script } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")

const createScript = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true
        const script = {
            name, description, type_of_fruit, mass, time, temperature, humidity
        } = req.body

        script.user_id = payload.user_id

        await Script.create(script)
            .then(() => {
                response.isSuccess = true
                response.message = 'Create script success'
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

exports.createScript = createScript