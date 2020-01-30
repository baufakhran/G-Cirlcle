const router = require('express').Router()
const gamesRouter = require('./games')
const profilRouter = require('./profil')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
const registerRouter = require('./register')

router.get('/')
router.use('/games', gamesRouter)
router.use('/profil', profilRouter)
router.use('/login', loginRouter)
router.use('/logout', logoutRouter)
router.use('/regiter', registerRouter)

module.exports = router