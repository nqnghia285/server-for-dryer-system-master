const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { Script } = require("../../../database/Models")

const ADMIN = 'admin'

const deleteScript = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const { script_id } = req.body

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            let scripDB = await Script.findOne({ where: { script_id: script_id } })

            if (scripDB !== null) {
                await scripDB.destroy()
                    .then(() => {
                        response.isSuccess = true
                        response.message = `You deleted a script has script_id: ${script_id}.`
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `Do not find script has script_id: ${script_id}`
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

exports.deleteScript = deleteScript