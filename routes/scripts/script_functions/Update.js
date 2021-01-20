const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { Script } = require('../../../database/Models')

const updateScript = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        const script = {
            script_id, name, description, type_of_fruit, mass, time, temperature, humidity
        } = req.body
        script.user_id = payload.user_id

        let scriptDB = await Script.findOne({ where: { script_id: script.script_id } })

        if (scriptDB !== null) {
            await scriptDB.update(script)
                .then(() => {
                    response.isSuccess = true
                    response.message = 'Update script success'
                })
                .catch(err => {
                    response.message = `Error: ${err.message}`
                })
        } else {
            response.message = `The script has script_id: ${script.script_id} do not exist in database.`
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, users, message
    res.json(response)
}

exports.updateScript = updateScript