const router = require('express').Router()
const UserController = require('../controllers/User')

router.get('/:id', UserController.getProfile)//melihat profil->bisa melihat game yg sudah dibeli

router.get('/:id/edit', UserController.getFormEdit)//form mengedit profil
router.post('/:id/edit', UserController.updateUser)//form mengedit profil
router.get('/:id/delete', UserController.getDeleteForm)//form validasi delete
router.post('/:id/delete', UserController.deleteData)//validasi delete

module.exports = router