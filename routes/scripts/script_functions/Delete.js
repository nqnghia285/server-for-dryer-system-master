const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { Script } = require("../../../database/Models")

const deleteScrip = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        let scripDB = await Script.findOne({ where: { script_id: req.body.script_id } })

        if (scripDB !== null) {
            await scripDB.destroy()
                .then(() => {
                    response.isSuccess = true
                    response.message = `You deleted a script has script_id: ${req.body.script_id}.`
                })
                .catch(err => {
                    response.message = `Error: ${err.message}`
                })
        } else {
            response.message = `Do not find script has script_id: ${req.body.script_id}`
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

exports.deleteScrip = deleteScrip