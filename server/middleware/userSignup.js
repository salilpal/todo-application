const { User } = require('../config/db')

const userExistsInSignup = async (req, res, next) => {
    try {
        const userExists = await User.findOne({username: username})
        if(userExists) return res.status(401).json({
            msg: 'user already exists'
        })
        next()
    } catch (e) {
        return res.status(401).json({
            msg: 'error finding user in user signup middleware',
            error: e.message
        })
    }
}

module.exports = {
    userExistsInSignup
}