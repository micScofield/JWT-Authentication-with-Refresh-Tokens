const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const { token } = req.cookies

    if (!token) next() // token MUST be present

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (err) {
        console.log('token is invalid')
        next()
    }
}

module.exports = { auth }