const { createCurrentSensor } = require("./current_sensor_functions/Create")
const { deleteCurrentSensor } = require("./current_sensor_functions/Delete")
const { getAllCurrentSensors } = require("./current_sensor_functions/GetAllCurrentSensors")
const { updateCurrentSensor } = require("./current_sensor_functions/Update")

const CurrentSensorFunction = {}

CurrentSensorFunction.createCurrentSensor = createCurrentSensor
CurrentSensorFunction.deleteCurrentSensor = deleteCurrentSensor
CurrentSensorFunction.updateCurrentSensor = updateCurrentSensor
CurrentSensorFunction.getAllCurrentSensors = getAllCurrentSensors

module.exports = CurrentSensorFunction