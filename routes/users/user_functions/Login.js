const { createToken } = require("../../../authentication/Auth")
const { comparePWD, hashPWD, findIndexOfUserList } = require("../../../common_functions/SystemFunction")
const { User } = require("../../../database/Models")

const EXPIRATION = 1 * 60 * 60 * 1000 // 1h

const login = async (req, res) => {
    // Global variables of app
    const userList = req.app.locals.userList
    const client = req.app.locals.client
    // Local variables
    const response = {}
    response.isSuccess = false
    response.isUserExist = false

    const user = {
        email: req.body.email,
        password: req.body.password
    }

    console.log(hashPWD('123456'));

    console.log('Cookie req: ', req.cookies);

    // Wait querying database until it is finished
    /*
        Parameters:
            user.email
        SQL:
            SELECT * FROM (SELECT * FROM company.user
            WHERE company.user.email = {user.email}) as users LIMIT 1;
    */
    let userDB = await User.findOne({ where: { email: user.email } })

    if (userDB !== null) {
        response.isUserExist = true
        if (comparePWD(user.password, userDB.password)) {
            let userToken = createToken(userDB.getInfo(), { expiresIn: '1h' })
            response.user_id = userDB.user_id
            response.email = userDB.email
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

            // Insert this user into userList
            if (findIndexOfUserList(userList, userDB.user_id) === -1) {
                userList.push({
                    user_id: userDB.user_id,
                    email: userDB.email,
                    role: userDB.role,
                    full_name: userDB.getFullName()
                })
            }

            console.log('Cookie of user login: ', res);
            console.log('User list: ', userList);

            client.emit('server-send-update-user-list', { userList: userList })
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