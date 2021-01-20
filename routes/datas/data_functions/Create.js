const { Data, DHT, CurrentSensor } = require("../../../database/Models");
const { dataParser } = require("./DataParser");

exports.createData = async (machine, ms) => {
    const machine_id = machine.id

    const data = dataParser(ms)

    data.session_id = machine.session_id

    const dht = await DHT.findOne({ where: { machine_id: machine_id } })
    const currentSensor = await CurrentSensor.findOne({ where: { machine_id: machine_id } })

    if (dht !== null && currentSensor !== null) {
        data.dht_id = dht.dht_id
        data.current_sensor_id = currentSensor.current_sensor_id
    }

    await Data.create(data)
        .then(() => { })
        .catch(err => { console.log('Insert Data Error: ', err.message); })
}