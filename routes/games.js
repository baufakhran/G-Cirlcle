const router = require('express').Router()

router.get('/')//menampilkan list games

router.get('/:id/:slug') //menampilkan detail game
router.get('/:id/:slug/buy') //membeli game ->user only

router.get('/add') //form menambahkan game-> Admin Only
router.post('/add')//menambahkan game-> Admin Only


module.exports = router