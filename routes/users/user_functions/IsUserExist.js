const Models = require('../../../database/Models')
const User = Models.User

// Check user if it exist in database return true, otherwise false
const isUserExist = async (username) => {
    // Wait querying database until it is finished
    /*
        Parameters:
            username
        SQL:
            SELECT * FROM (SELECT * FROM company.user
            WHERE user.username = {username}) as users LIMIT 1;
    */
    let user = await User.findOne({ where: { username: username } })

    if (user !== null) {
        return true
    } else {
        return false
    }
}

exports.isUserExist = isUserExist