const router = require('express').Router()
const UserController = require('../controllers/User')
const auth = require('../middleware/auth')

router.get('/',auth.isLogin, UserController.logOut)//logout

module.exports = router