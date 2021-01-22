const { controlDevices } = require("./ControlDevices");
const { controlMachine } = require("./ControlMachine");
const { controlManualOrAuto } = require("./ControlManualOrAuto");
const { setCycleTime } = require("./SetCycleTime");

const UserActionFunction = {
    controlDevices: controlDevices,
    controlManualOrAuto: controlManualOrAuto,
    setCycleTime: setCycleTime,
    controlMachine: controlMachine
}

module.exports = UserActionFunction