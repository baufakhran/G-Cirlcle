const router = require('express').Router()

router.get('/games')//menampilkan list games

router.get('/games/:id/:slug') //menampilkan detail game
router.get('/games/:id/:slug/buy') //membeli game ->user only

router.get('/games/add') //form menambahkan game-> Admin Only
router.post('/games/add')//menambahkan game-> Admin Only


module.exports = router