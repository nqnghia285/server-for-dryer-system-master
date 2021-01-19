const { createCurrentSensor } = require("./current_sensor_functions/Create")
const { deleteCurrentSensor } = require("./current_sensor_functions/Delete")
const { getAllCurrentSensors } = require("./current_sensor_functions/GetAllCurrentSensors")
const { updateCurrentSensor } = require("./current_sensor_functions/Update")

const CurrentSensorFunction = {
    createCurrentSensor: createCurrentSensor,
    deleteCurrentSensor: deleteCurrentSensor,
    updateCurrentSensor: updateCurrentSensor,
    getAllCurrentSensors: getAllCurrentSensors
}

module.exports = CurrentSensorFunction