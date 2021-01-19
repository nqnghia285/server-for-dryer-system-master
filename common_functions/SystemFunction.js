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

const findIndexOfMachineInList = (code, machineList) => {
    let index = -1;
    if (machineList !== undefined && machineList !== null) {
        machineList.forEach((obj, i) => {
            if (obj.code === code) {
                index = i
            }
        });
    }
    return index
}

const removeUser = (userList, user_id) => {
    let isContain = false
    let index = -1
    userList.forEach((obj, i) => {
        if (obj.user_id === user_id) {
            isContain = true
            index = i
        }
    })

    if (index !== -1) {
        userList.splice(index, 1)
        return true
    }

    return false
}

const findIndexOfUserList = (userList, user_id) => {
    let index = -1;
    if (userList !== undefined && userList !== null) {
        userList.forEach((obj, i) => {
            if (obj.user_id === user_id) {
                index = i
            }
        });
    }
    return index
}

const SystemFunction = {
    findIndexOfUserList: findIndexOfUserList,
    removeUser: removeUser,
    findIndexOfMachineInList: findIndexOfMachineInList,
    comparePWD: comparePWD,
    hashPWD: hashPWD,
    convertMinuteToMiliSecond: convertMinuteToMiliSecond,
    mergeDayWithDuration: mergeDayWithDuration
}

module.exports = SystemFunction