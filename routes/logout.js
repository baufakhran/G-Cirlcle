const router = require('express').Router()
const UserController = require('../controllers/User')

router.get('/', UserController.logOut)//logout

module.exports = router