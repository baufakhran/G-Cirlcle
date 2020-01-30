const router = require('express').Router()
const UserController = require('../controllers/User')
const auth = require('../middleware/auth')


router.get('/', UserController.getAllUser)


module.exports = router