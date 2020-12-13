const sleep = {}

sleep.msleep = (n) => {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, n)
}

sleep.sleep = (n) => {
    sleep.msleep(n * 1000)
}

module.exports = sleep