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