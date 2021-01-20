const { createMachine } = require("./machine_functions/Create")
const { deleteMachine } = require("./machine_functions/Delete")
const { getAllMachines } = require("./machine_functions/GetAllMachines")
const { getMachineInfo } = require("./machine_functions/GetMachineInfo")
const { updateMachine } = require("./machine_functions/Update")

const MachineFunction = {
    createMachine: createMachine,
    deleteMachine: deleteMachine,
    getAllMachines: getAllMachines,
    updateMachine: updateMachine,
    getMachineInfo: getMachineInfo
}

module.exports = MachineFunction