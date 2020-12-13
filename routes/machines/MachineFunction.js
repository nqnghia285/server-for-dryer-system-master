const { createMachine } = require("./machine_functions/Create")
const { deleteMachine } = require("./machine_functions/Delete")
const { getAllMachines } = require("./machine_functions/GetAllMachines")
const { updateMachine } = require("./machine_functions/Update")

const MachineFunction = {}

MachineFunction.createMachine = createMachine
MachineFunction.deleteMachine = deleteMachine
MachineFunction.getAllMachines = getAllMachines
MachineFunction.updateMachine = updateMachine

module.exports = MachineFunction