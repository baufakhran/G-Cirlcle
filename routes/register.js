const router = require('express').Router()
const UserController = require('../controllers/User')

router.get('/', UserController.getFormRegister)//form register
router.post('/', UserController.register)//register

module.exports = router