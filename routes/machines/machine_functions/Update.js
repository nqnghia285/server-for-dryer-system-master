const { Op } = require('sequelize')
const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { Machine } = require('../../../database/Models')

const ADMIN = 'admin'

const updateMachine = async (req, res) => {
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            const machine = {
                name: req.body.name,
                description: req.body.description,
                code: req.body.code,
                status: req.body.status,
                position: req.body.position
            }

            let machineDB = await Machine.findOne({ where: { machine_id: req.body.machine_id } })

            if (machineDB !== null) {
                let machineValidate = await Machine.findOne(
                    {
                        where: {
                            [Op.or]: [
                                { name: req.body.name },
                                { code: req.body.code }
                            ]
                        }
                    })

                if (machineValidate === null) {
                    await machineDB.update(machine)
                        .then(() => {
                            response.isSuccess = true
                            response.message = 'Update machine success'
                        })
                        .catch(err => {
                            response.message = `Error: ${err.message}`
                        })
                } else {
                    response.message = `name: ${req.body.name} or code: ${req.body.code} existed in database.`
                }
            } else {
                response.message = `The machine has machine_id: ${req.body.machine_id} do not exist in database.`
            }
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

exports.updateMachine = updateMachine