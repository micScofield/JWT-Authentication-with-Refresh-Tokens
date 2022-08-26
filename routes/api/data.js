const router = require('express').Router()

const { requireAuth } = require('../../middlewares/require-auth')

router.get('/api/data', requireAuth, (req, res) => {
    return res.json({ msg: 'Protected Data' })
})

exports.dataRouter = router