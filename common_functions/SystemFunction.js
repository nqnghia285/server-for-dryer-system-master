const bcrypt = require('bcrypt')

const comparePWD = (pwd, hash) => {
    try {
        return bcrypt.compareSync(pwd, hash)
    } catch (error) {
        console.log(error)
        return false
    }
}

const hashPWD = (pwd, salt = bcrypt.genSaltSync()) => {
    try {
        return bcrypt.hashSync(pwd, salt)
    } catch (error) {
        console.log(error)
        return undefined
    }
}

const convertMinuteToMiliSecond = (minute) => {
    return 1000 * 60 * minute
}

// Duration: minute
const mergeDayWithDuration = (day, duration) => {
    return new Date(day.getTime() + convertMinuteToMiliSecond(duration))
}

exports.comparePWD = comparePWD
exports.hashPWD = hashPWD
exports.convertMinuteToMiliSecond = convertMinuteToMiliSecond
exports.mergeDayWithDuration = mergeDayWithDuration