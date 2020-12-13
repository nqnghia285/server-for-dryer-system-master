const { createScript } = require("./script_functions/Create")
const { deleteScrip } = require("./script_functions/Delete")
const { getAllScripts } = require("./script_functions/GetAllScripts")
const { updateScript } = require("./script_functions/update")

const ScriptFunction = {}

ScriptFunction.createScript = createScript
ScriptFunction.deleteScript = deleteScrip
ScriptFunction.getAllScripts = getAllScripts
ScriptFunction.updateScript = updateScript

module.exports = ScriptFunction