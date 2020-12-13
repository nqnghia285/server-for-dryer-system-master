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

exports.comparePWD = comparePWD
exports.hashPWD = hashPWD