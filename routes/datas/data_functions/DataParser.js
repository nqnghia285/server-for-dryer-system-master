const jsonParser = (data) => {
    return JSON.parse(data)
}

exports.dataParser = (ms) => {
    const data = { current } = ms

    let dht1 = ms.dht1
    let dht2 = ms.dht2
    let dht3 = ms.dht3

    let count = 0
    let temperature = 0.0
    let humidity = 0.0

    if (dht1 !== '-1') {
        let obj1 = jsonParser(dht1)
        temperature += obj1.temperature
        humidity += obj1.humidity
        count++
    }

    if (dht2 !== '-1') {
        let obj2 = jsonParser(dht2)
        temperature += obj2.temperature
        humidity += obj2.humidity
        count++
    }

    if (dht3 !== '-1') {
        let obj3 = jsonParser(dht3)
        temperature += obj3.temperature
        humidity += obj3.humidity
        count++
    }

    if (count > 0) {
        data.temperature = temperature / count
        data.humidity = humidity / count
    } else {
        data.temperature = 0
        data.humidity = 0
    }

    return data
}

exports.fullDataParser = (ms) => {
    const data = {}

    data.code = ms.code
    data.current = ms.current
    data.temperature = ms.temperature
    data.humidity = ms.humidity
    data.eFan = ms.eFan
    data.bFan = ms.bFan
    data.heater = ms.heater

    let dht1 = ms.dht1
    let dht2 = ms.dht2
    let dht3 = ms.dht3

    if (dht1 !== undefined && dht1 !== '-1') {
        data.dht1 = jsonParser(dht1)
    } else {
        data.dht1 = -1
    }

    if (dht2 !== undefined && dht2 !== '-1') {
        data.dht2 = jsonParser(dht2)
    } else {
        data.dht2 = -1
    }

    if (dht3 !== undefined && dht3 !== '-1') {
        data.dht3 = jsonParser(dht3)
    } else {
        data.dht3 = -1
    }

    return data
}