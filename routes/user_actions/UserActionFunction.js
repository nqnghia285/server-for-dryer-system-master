const { controlDevices } = require("./ControlDevices");
const { controlManualOrAuto } = require("./ControlManualOrAuto");

const UserActionFunction = {
    controlDevices: controlDevices,
    controlManualOrAuto: controlManualOrAuto
}

module.exports = UserActionFunction