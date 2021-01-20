const { Op } = require('sequelize')
const { authenticateUserFromReq } = require('../../../authentication/Auth')
const { Machine } = require('../../../database/Models')
const { updateMachineList } = require('../../../server')

const ADMIN = 'admin'

const updateMachine = async (req, res) => {
    // Global variables of app
    const { machineList, client } = req.app.locals
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN) {
            response.isValid = true

            const machine = {
                machine_id, name, description, code, position
            } = req.body

            let machineDB = await Machine.findOne({ where: { machine_id: machine.machine_id } })

            if (machineDB !== null) {
                let machineExist = await Machine.findOne(
                    {
                        where: {
                            machine_id: { [Op.ne]: machine.machine_id },
                            [Op.or]: [
                                { name: machine.name },
                                { code: machine.code }
                            ]
                        }
                    })

                if (machineExist === null) {
                    await machineDB.update(machine)
                        .then(() => {
                            response.isSuccess = true
                            response.message = 'Update machine success'
                            updateMachineList({ code: machine.code, status: 'off' }, machineList)
                            client.emit('server-send-update-machine-list', { machineList: machineList })
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