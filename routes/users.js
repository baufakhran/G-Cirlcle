const router = require('express').Router()
const UserController = require('../controllers/User')
const auth = require('../middleware/auth')


router.get('/',auth.checkAdmin, UserController.getAllUser)


module.exports = router