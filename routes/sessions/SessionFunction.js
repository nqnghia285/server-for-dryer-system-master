const { createSession } = require("./session_functions/Create")
const { deleteSession } = require("./session_functions/Delete")
const { updateSession } = require("./session_functions/Update")
const { getAllSessions } = require('./session_functions/GetAllSessions')

const SessionFunction = {
    createSession: createSession,
    deleteSession: deleteSession,
    updateSession: updateSession,
    getAllSessions: getAllSessions
}

module.exports = SessionFunction