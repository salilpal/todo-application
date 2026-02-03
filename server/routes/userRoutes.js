const router = require('express').Router()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { User } = require('../config/db')
const { userExistsInSignup } = require('../middleware/userSignup')
const { userExistsInSignin } = require('../middleware/userSignin')
const JWT_SECRET = process.env.JWT_SECRET

router.post('/signup',userExistsInSignup, async (req, res) => {
    const {username, password} = req.body;
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await User.create({
            username: username,
            password: hashedPassword
        })
        return res.status(201).json({
            msg: 'user created successfully',
            user: user
        })
    } catch (e) {
        return res.status(401).json({
            msg: 'error creating user',
            error: e.message
        })
    }
})

router.post('signin', userExistsInSignin, async (req, res) => {
    const {username, password} = req.body
    const user = await User.findOne({
        username: username
    })
    const compare = bcrypt.compare(password, user.password)
    if(!compare) return res.status(401).json({
        msg: 'password does not match'
    })
    try {
        const token = jwt.sign({
            username: username,
        }, JWT_SECRET, {expiresIn: '1h'})
        return res.status(201).json({
            msg: 'token created successfully',
            token: token
        })
    } catch (e) {
        return res.status(401).json({
            msg: 'error signing the user',
            error: e.message
        })
    }
})

module.exports = router