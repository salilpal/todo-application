const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET

const userVerification = (req, res, next) => {
    const tokenHeader = req.header.authorization
    const token = tokenHeader.split()[1]
    const verified = jwt.verify(token, JWT_SECRET)
    if (!verified) return res.status(401).json({
        msg: 'token mismatch'
    })
    verified = req.user
    next()
}

module.exports = {
    userVerification
}