const { User } = require("../config/db")

const userExistsInSignin = async (req, res, next) => {
    const {username} = req.body
    try {
        const user = await User.findOne({
            username: username
        })
        if(!user) return res.status(401).json({
            msg: 'user does not exist'
        })
        next()
    } catch (e) {
        return res.status(404).json({
            msg: 'error finding user in signin middleware',
            error: e.message
        })
    }
}

module.exports = {
    userExistsInSignin
}