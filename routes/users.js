const router = require('express').Router()
const UserController = require('../controllers/User')

router.get('/', UserController.getAllUser)


module.exports = router