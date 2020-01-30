const router = require('express').Router()
const UserController = require('../controllers/User')
const auth = require('../middleware/auth')

router.get('/', auth.shutdownLogin, UserController.getLoginForm)//form 
router.post('/', UserController.login)//

module.exports = router
