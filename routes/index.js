const router = require('express').Router()
const gamesRouter = require('./games')
const profilRouter = require('./profil')
const loginRouter = require('./login')
const logoutRouter = require('./logout')
const registerRouter = require('./register')
const userRouter = require('./users')
const auth = require('../middleware/auth')


router.use(auth.getUser);
router.get('/', (req, res) => {
   let users = req.users;
   // if(req.session.isLogin) {
   //    data = {
   //       userId : req.session.userId,
   //       username : req.session.username,
   //       role : req.session.role,
   //       isLogin : req.session.isLogin,
   //       wallet : req.session.wallet
   //    }
   //    // console.log(data)
   // }
  res.render('index', { users })
})
router.use('/games', gamesRouter)
router.use('/profile', profilRouter) //1
router.use('/login', loginRouter)
router.use('/logout', logoutRouter)
router.use('/register', registerRouter)
router.use('/users', userRouter)


module.exports = router