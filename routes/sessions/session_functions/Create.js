const { Session, Machine, Script } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { findIndexOfMachineInList } = require("../../../common_functions/SystemFunction")

const createSession = async (req, res) => {
    // Global variables of app
    const machineList = req.app.locals.machineList
    const client = req.app.locals.client
    const io = req.app.locals.io
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true
        let session = {
            user_id: payload.user_id,
            script_id: req.body.script_id
        }

        console.log(req.body);

        const index = findIndexOfMachineInList(req.body.code, machineList)
        const status = machineList[index].status
        const machine_id = machineList[index].machine_id

        session.machine_id = machine_id

        if (status === 'on') {
            // const machineDB = await Machine.findOne({ where: { code: req.body.code } })

            // console.log(machineDB)

            // if (machineDB) {
            //     session.machine_id = machineDB.machine_id
            // }

            await Session.create(session)
                .then(async (result) => {

                    response.message = 'Create session success'
                    const machine = machineList[findIndexOfMachineInList(req.body.code, machineList)]
                    console.log('New Session:', result);
                    machine.session_id = result.session_id
                    machine.status = 'running'

                    client.emit('server-send-update-machine-list', { machineList: machineList })

                    const script = await Script.findOne({ where: { script_id: result.script_id } })
                    if (script) {
                        response.isSuccess = true
                        io.emit('server-send-script', `{"code":"${machineDB.code}","temperature":${script.temperature}}`)
                    } else {
                        response.message = `Find not script: ${result.script_id} in database`
                    }
                })
                .catch(err => {
                    response.message = `Error: ${err.message}`
                })
        } else {
            response.message = `The status of machine ${req.body.code} is "on" or "running".`
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

exports.createSession = createSession