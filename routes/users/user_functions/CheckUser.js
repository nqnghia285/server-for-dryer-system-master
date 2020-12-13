const { isUserExist } = require("./IsUserExist")

const checkUser = async (req, res) => {
    const response = {}
    const flag = await isUserExist(req.body.username)
    if (flag) {
        response.isUserExist = true
        response.message = 'User is exist'
    } else {
        response.isUserExist = false
        response.message = 'User is not exist'
    }

    // Response client 
    // Params: isUserExist, message
    res.json(response)
}

exports.checkUser = checkUser