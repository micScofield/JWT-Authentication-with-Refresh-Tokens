const router = require('express').Router()
const jwt = require('jsonwebtoken')
const path = require('path')
const fs = require('fs')
const { signAccessToken, signRefreshToken } = require('../../utils/createTokens')

const incrementer = () => {
    let userid = 0
    return function inner() {
        return ++userid
    }
}
const generateId = incrementer()

const db_path = path.join(__dirname, '../../', 'db', 'users.json')

router.post('/api/users/signup', (req, res) => {
    const { username, password } = req.body

    const user = { id: generateId(), username, password }

    fs.readFile(db_path, (err, content) => {
        let existingUsers
        if (!err) {
            existingUsers = JSON.parse(content)
        }

        existingUsers.users = [...existingUsers.users, user]

        fs.writeFile(db_path, JSON.stringify(existingUsers), err => console.log(err))
    })

    const payload = {
        id: user.id,
        username
    }

    const { newToken } = signAccessToken(payload)
    const { newRefreshToken } = signRefreshToken(payload)

    res.cookie('token', newToken, { httpOnly: true })

    req.user = payload

    return res.status(201).json({ msg: 'Signed Up Successfully', refresh_token: newRefreshToken })
})

exports.signupRouter = router