const { createToken } = require("../../../authentication/Auth")
const { comparePWD } = require("../../../common_functions/SystemFunction")
const { User } = require("../../../database/Models")

const EXPIRATION = 1 * 60 * 60 * 1000 // 1h

const login = async (req, res) => {
    const response = {}
    response.isSuccess = false
    response.isUserExist = false

    const user = {
        username: req.body.username,
        password: req.body.password
    }

    // Wait querying database until it is finished
    /*
        Parameters:
            user.username
        SQL:
            SELECT * FROM (SELECT * FROM company.user
            WHERE company.user.username = {user.username}) as users LIMIT 1;
    */
    let userDB = await User.findOne({ where: { username: user.username } })

    if (userDB !== null) {
        response.isUserExist = true
        if (comparePWD(user.password, userDB.password)) {
            let userToken = createToken(userDB.getInfo(), { expiresIn: '1h' })
            response.username = userDB.username
            response.role = userDB.role
            response.isSuccess = true

            // Insert token into cookie
            res.cookie(
                'token',
                userToken,
                {
                    domain: 'localhost',
                    maxAge: EXPIRATION,
                    secure: false, // Set true if your using https
                    httpOnly: true // Set true to prevent any script codes access it from client
                }
            )
        } else {
            response.message = 'The username and password are matched.'
        }
    } else {
        response.message = 'user is not exist'
    }

    // Response client
    // Params: isValid, message, isError, isUserExist, username, role, isSuccess
    res.json(response)
}

exports.login = login