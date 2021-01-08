const { createDHT } = require("./dht_functions/Create")
const { deleteDHT } = require("./dht_functions/Delete")
const { getAllDHTs } = require("./dht_functions/GetAllDHTs")
const { updateDHT } = require("./dht_functions/Update")

const DHTFunction = {}

DHTFunction.createDHT = createDHT
DHTFunction.deleteDHT = deleteDHT
DHTFunction.getAllDHTs = getAllDHTs
DHTFunction.updateDHT = updateDHT

module.exports = DHTFunction