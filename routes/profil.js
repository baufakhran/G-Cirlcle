const router = require('express').Router()

router.get('/profile')//melihat profil->bisa melihat game yg sudah dibeli

router.get('/profile/:id/edit')//form mengedit profil
router.post('/profile/:id/edit')//form mengedit profil
router.get('/profile/:id/delete')//form validasi delete
router.post('/profile/:id/delete')//validasi delete

module.exports = router