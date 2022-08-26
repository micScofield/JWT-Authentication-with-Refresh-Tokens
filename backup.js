/*
const jwt = require('jsonwebtoken')

const refreshTokens = async (token, refresh_token) => {

    return {}
}

const auth = (req, res, next) => {
    const { token, refresh_token } = req.cookies
    let user

    if (!token) next() // token MUST be present

    try {
        jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {

    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            console.log('token expired, refreshing...')
            // refresh token logic here

            if (!refresh_token) next()

            // todo: generate and set new tokens
            const {} = await refreshTokens(token, refresh_token)

            res.cookie('token', newToken, { httpOnly: true })
            res.cookie('refresh_token', newRefreshToken, { httpOnly: true })

            // verify refresh token
            // jwt.verify(refresh_token, process.env.JWT_REFRESH, (err, decoded) => {
            //     if (err) {
            //         console.log('Refresh token is invalid')
            //         next()
            //     } else {
            //         user = decoded

                    // generate two new tokens and set to cookies
                    // const newToken = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: 5 })

                    // // generate refresh token
                    // const newRefreshToken = jwt.sign(user, process.env.JWT_REFRESH, { expiresIn: 10 })

                    // res.cookie('token', newToken, { httpOnly: true })
                    // res.cookie('refresh_token', newRefreshToken, { httpOnly: true })
                // }
            // })
        }
        else {
            user = decoded
        }
    })
    if (user) {
        console.log('Current User: ', user)
        req.user = user
        next()
    }
}

module.exports = { auth }

*/

// Backup 2
/*
const jwt = require('jsonwebtoken')
const { createTokens } = require('../utils/createTokens')

const auth = (req, res, next) => {
    const { token, refresh_token } = req.cookies

    if (!token) next() // token MUST be present

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = payload
        next()
    } catch (err) {
        if (!refresh_token) next()
        console.log('token expired, refreshing...')

        let decodedRefreshToken
        try {
            const payload = jwt.verify(refresh_token, process.env.JWT_REFRESH)
            decodedRefreshToken = payload
        } catch (err) {
            console.log('Refresh token expired')
            next()
        }

        const { newToken, newRefreshToken } = createTokens(decodedRefreshToken)

        res.cookie('token', newToken, { httpOnly: true })
        res.cookie('refresh_token', newRefreshToken, { httpOnly: true })

        req.user = newToken.payload
        next()
    }
}

module.exports = { auth }
*/