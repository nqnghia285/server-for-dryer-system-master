const Models = require('../../../database/Models')
const User = Models.User

// Check user if it exist in database return true, otherwise false
const isUserExist = async (email) => {
    // Wait querying database until it is finished
    /*
        Parameters:
            email
        SQL:
            SELECT * FROM (SELECT * FROM company.user
            WHERE user.email = {email}) as users LIMIT 1;
    */
    let user = await User.findOne({ where: { email: email } })

    if (user !== null) {
        return true
    } else {
        return false
    }
}

exports.isUserExist = isUserExist