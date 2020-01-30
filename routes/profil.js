const router = require('express').Router()
const UserController = require('../controllers/User')
const auth = require('../middleware/auth')

router.get('/',auth.checkUser, UserController.getProfile)//melihat profil->bisa melihat game yg sudah dibeli
router.get('/:id',auth.checkUser, UserController.getProfile)//melihat profil->bisa melihat game yg sudah dibeli
router.get('/:id/edit', UserController.getFormEdit)//form mengedit profil
router.post('/:id/edit', UserController.updateUser)//form mengedit profil
router.get('/:id/delete', UserController.getDeleteForm)//form validasi delete
router.post('/:id/delete', UserController.deleteData)//validasi delete
router.get('/:id/topup', UserController.topUpForm)
router.post('/:id/topup', UserController.topUp)
module.exports = router