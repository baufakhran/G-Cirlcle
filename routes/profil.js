const router = require('express').Router()

router.get('/')//melihat profil->bisa melihat game yg sudah dibeli

router.get('/:id/edit')//form mengedit profil
router.post('/:id/edit')//form mengedit profil
router.get('/:id/delete')//form validasi delete
router.post('/:id/delete')//validasi delete

module.exports = router