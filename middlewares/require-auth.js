const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ msg: 'Not Authorized' })
    } else next()
}

module.exports = { requireAuth }