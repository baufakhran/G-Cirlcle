const router = require('express').Router()
const GameController = require('../controller/Game')
router.get('/', GameController.findAll)//menampilkan list games

router.get('/:id/edit', GameController.editForm)
router.post('/:id/edit', GameController.edit)

router.get('/:id/:slug', GameController.detailGame) //menampilkan detail game
router.get('/:id/buy') //membeli game ->user only

router.get('/:id/delete', GameController.deleteGame)

// router.get('/add') //form menambahkan game-> Admin Only
// router.post('/add')//menambahkan game-> Admin Only


module.exports = router