const { createDHT11 } = require("./dht11_functions/Create")
const { deleteDHT11 } = require("./dht11_functions/Delete")
const { getAllDHT11s } = require("./dht11_functions/GetAllDHT11s")
const { updateDHT11 } = require("./dht11_functions/Update")

const DHT11Function = {}

DHT11Function.createDHT11 = createDHT11
DHT11Function.deleteDHT11 = deleteDHT11
DHT11Function.getAllDHT11s = getAllDHT11s
DHT11Function.updateDHT11 = updateDHT11

module.exports = DHT11Function