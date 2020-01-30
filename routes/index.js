const router = require('express').Router()
const gamesRouter = require('./games')
const profilRouter = require('./profil')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
const registerRouter = require('./register')
const userRouter = require('./users')

router.get('/', (req, res) => {
   res.render('index')
})
router.use('/games', gamesRouter)
router.use('/profile', profilRouter) //1
router.use('/login', loginRouter)
router.use('/logout', logoutRouter)
router.use('/register', registerRouter)
router.use('/users', userRouter)


module.exports = router