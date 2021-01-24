const { Session, Script } = require("../../../database/Models")
const { authenticateUserFromReq } = require("../../../authentication/Auth")
const { findIndexOfMachineInList } = require("../../../common_functions/SystemFunction")

const ADMIN = 'admin'
const EMPLOYEE = 'employee'

const createSession = async (req, res) => {
    // Global variables of app
    const machineList = req.app.locals.machineList
    const client = req.app.locals.client
    const io = req.app.locals.io
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const { code, script_id } = req.body

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        if (payload.role === ADMIN || payload.role === EMPLOYEE) {
            response.isValid = true
            const session = {
                user_id: payload.user_id,
                script_id: script_id
            }

            console.log(req.body);

            const machine = machineList[findIndexOfMachineInList(code, machineList)]
            const status = machine.status
            const machine_id = machine.id

            session.machine_id = machine_id
            console.log(status);
            console.log(session);
            console.log(machine);

            if (status === 'on') {

                await Session.create(session)
                    .then(async (result) => {

                        response.message = 'Create session success'
                        console.log('New Session:', result);
                        machine.session_id = result.session_id
                        machine.status = 'running'
                        machine.finishTime = result.finish_time.getTime()

                        client.emit('server-send-update-machine-list', { machineList: machineList })

                        const script = await Script.findOne({ where: { script_id: result.script_id } })
                        if (script !== null) {
                            response.isSuccess = true
                            io.emit('server-send-script', `{"code":"${code}","temperature":${script.temperature}}`)
                        } else {
                            response.message = `Find not script: ${result.script_id} in database`
                        }
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `The status of machine ${code} is "off" or "running".`
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

exports.createSession = createSession