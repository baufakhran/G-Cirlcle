const router = require('express').Router()
const UserController = require('../controllers/User')

router.get('/', UserController.getLoginForm)//form 
router.post('/', UserController.login)//

module.exports = router
