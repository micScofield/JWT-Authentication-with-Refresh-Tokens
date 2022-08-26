const router = require('express').Router()
const jwt = require('jsonwebtoken')

const { signAccessToken } = require('../../utils/createTokens')

router.get('/api/access', (req, res) => {
    const { x_refresh_token } = req.headers
    console.log(x_refresh_token)
    console.log(req.headers)
    if (!x_refresh_token) return res.status(400).json({ msg: 'No refresh token provided' })

    try {
        const payload = jwt.verify(x_refresh_token, process.env.JWT_REFRESH)
        console.log('refresh token is valid', payload)
        // create a new payload
        const newPayload = {
            id: payload.id,
            username: payload.username
        }

        const { newToken } = signAccessToken(newPayload)
        console.log('new access token', newToken)

        res.cookie('token', newToken, { httpOnly: true })
        
        return res.status(200).json({ msg: 'Access token refreshed' })
    } catch (err) {
        console.log(err)
        return res.status(401).json({ msg: 'Invalid refresh token provided' })
    }
})

exports.refreshAccessTokenRouter = router