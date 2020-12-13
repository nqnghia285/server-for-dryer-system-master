const jwt = require('jsonwebtoken')
const jwtKey = process.env.JWT_KEY

// Authenticate user
// Return payload if token is valid
// otherwise return undefined
const authenticateUser = (token) => {
    try {
        return jwt.verify(token, jwtKey)
    } catch (error) {
        console.log(error)
        return undefined
    }
}

// Create a token for payload
// Return an encoded token if the function is not error
// otherwise return undefined
const createToken = (payload, option = {}) => {
    try {
        return jwt.sign(payload, jwtKey, option)
    } catch (error) {
        console.log(error)
        return undefined
    }
}

// Authenticate user
// Return payload if token is valid
// otherwise return undefined
const authenticateUserFromReq = (req) => {
    // Get token in headers
    // let userToken = req.headers['authorization'] || req.headers['x-access-token']
    // console.log('cookie: ' + req.headers.cookie);
    // console.log('Cookies: ' + JSON.stringify(req.cookies))
    let userToken = req.cookies.token
    if (userToken !== undefined) {
        // Remove 'Bearer ' from userToken
        if (userToken.startsWith('Bearer ')) {
            userToken = userToken.slice(7, userToken.length)
        }

        return authenticateUser(userToken)
    } else {
        return undefined
    }
}

exports.authenticateUser = authenticateUser
exports.createToken = createToken
exports.authenticateUserFromReq = authenticateUserFromReq