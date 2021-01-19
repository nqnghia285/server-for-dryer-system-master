const { Op } = require("sequelize")
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

    console.log('Body: ', req.body);

    const payload = authenticateUserFromReq(req)

    if (payload !== undefined) {
        response.isValid = true

        const user = {}
        let isPassed = false

        if (req.body.isProfile) {
            user.user_id = req.body.user_id
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.gender = req.body.gender
            user.date_of_birth = req.body.date_of_birth
            user.phone_number = req.body.phone_number
            user.address = req.body.address
            user.email = req.body.email

            let flag = await isUserExist(user.email)

            if (flag) {
                let userExist = await User.findOne({
                    where: {
                        [Op.and]: [
                            { user_id: user.user_id },
                            { email: user.email }
                        ]
                    }
                })

                if (userExist !== null) {
                    isPassed = true
                } else {
                    response.message = `This email: ${user.email} existed in database.`
                }
            } else {
                isPassed = true
            }
        } else {
            if (req.body.password !== undefined && req.body.password !== '') {
                user.user_id = req.body.user_id
                user.password = hashPWD(req.body.password)

                const regex = /^[\S]{6,20}$/i
                if (regex.test(req.body.password)) {
                    isPassed = true
                } else {
                    response.message = 'The new password is invalid.'
                }
            } else {
                response.message = 'The new password is undefined.'
            }
        }

        if (isPassed) {
            if (payload.role === ADMIN && payload.user_id !== user.user_id) {
                if (req.body.role) {
                    user.role = req.body.role
                }
            }

            let userDB = await User.findOne({ where: { user_id: user.user_id } })

            if (userDB !== null) {
                await userDB.update(user)
                    .then(() => {
                        response.isSuccess = true
                        if (req.body.isProfile) {
                            response.message = `Update profile is successful.`
                        } else {
                            response.message = `Update password is successful.`
                        }
                    })
                    .catch(err => {
                        response.message = `Error: ${err.message}`
                    })

                console.log('id payload: ', payload.user_id);
                console.log('id user: ', user.user_id);

                // Update info themself
                if (payload.user_id === user.user_id) {
                    let userToken = createToken(userDB.getInfo(), { expiresIn: '1h' })

                    console.log('Token: ', userToken);

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
            } else {
                response.message = `Do not find ${user_id}`
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