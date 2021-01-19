const { createScript } = require("./script_functions/Create")
const { deleteScript } = require("./script_functions/Delete")
const { getAllScripts } = require("./script_functions/GetAllScripts")
const { updateScript } = require("./script_functions/update")

const ScriptFunction = {
    createScript: createScript,
    deleteScript: deleteScript,
    getAllScripts: getAllScripts,
    updateScript: updateScript
}

module.exports = ScriptFunction