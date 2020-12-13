const { authenticateUserFromReq, createToken } = require("../../../authentication/Auth")
const { hashPWD } = require("../../../common_functions/SystemFunction")
const { User } = require("../../../database/Models")
const { isUserExist } = require("./IsUserExist")

const ADMIN = 'admin'
const EXPIRATION = 1 * 60 * 60 * 1000 // 1h
const TRUE = 'true'

const updateUser = async (req, res) => {
    // Authenticate user
    const response = {}
    response.isValid = false
    response.isSuccess = false

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        const user = {}
        let isPassed = false

        if (req.body.profile === TRUE) {
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.gender = req.body.gender
            user.date_of_birth = req.body.date_of_birth
            user.phone_number = req.body.phone_number
            user.address = req.body.address
            user.username = req.body.username

            let flag = await isUserExist(user.username)

            if (!flag) {
                isPassed = true
            } else {
                response.message = `The fields are invalid or ${user.username} existed in database.`
            }
        } else {
            user.password = hashPWD(req.body.password)

            const regex = /^[\S]{6,20}$/i
            if (regex.test(req.body.password)) {
                isPassed = true
            } else {
                response.message = 'The new password is invalid.'
            }
        }

        if (isPassed) {
            let user_id = ''
            if (req.body.isMyself === TRUE) {
                user_id = payload.user_id
            } else if (payload.role === ADMIN) {
                user_id = req.body.user_id
            }

            let userDB = await User.findOne({ where: { user_id: user_id } })

            if (userDB !== null) {
                await userDB.update(user)
                    .then(() => {
                        response.isSuccess = true
                        if (req.body.profile === TRUE) {
                            response.message = `Update profile is successful.`
                        } else {
                            response.message = `Update password is successful.`
                        }
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })
            } else {
                response.message = `Do not find ${user_id}`
            }

            if (req.body.isMyself === TRUE && response.isSuccess) {

                let userDB = await User.findOne({ where: { user_id: payload.user_id } })

                if (userDB !== null) {
                    let userToken = createToken(userDB.getInfo(), { expiresIn: '1h' })

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
                }
            }
        }
    } else {
        response.message = 'The user token is invalid'
    }

    // Response client
    // Params: isValid, isSuccess, message
    res.json(response)
}

exports.updateUser = updateUser