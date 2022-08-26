const router = require('express').Router()

const { auth } = require('../../middlewares/auth')

router.get('/', auth, (req, res) => {
    res.json({ msg: 'Index Route, go to /api/users/signup from Postman' })
})

exports.indexRouter = router