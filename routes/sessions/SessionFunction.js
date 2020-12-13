const { createSession } = require("./session_functions/Create")
const { deleteSession } = require("./session_functions/Delete")
const { updateSession } = require("./session_functions/Update")
const { getAllSessions } = require('./session_functions/GetAllSessions')

const SessionFunction = {}

SessionFunction.createSession = createSession
SessionFunction.deleteSession = deleteSession
SessionFunction.updateSession = updateSession
SessionFunction.getAllSessions = getAllSessions

module.exports = SessionFunction