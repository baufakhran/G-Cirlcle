const router = require('express').Router()
const GameController = require('../controllers/Game')
router.get('/', GameController.findAll)//menampilkan list games

router.get('/:id/edit', GameController.editForm)
router.post('/:id/edit', GameController.edit)

router.get('/:id/delete', GameController.deleteGame)

router.get('/:id/:slug', GameController.detailGame) //menampilkan detail game
router.get('/:id/buy') //membeli game ->user only



router.get('/add', GameController.addForm) //form menambahkan game-> Admin Only
router.post('/add', GameController.add)//menambahkan game-> Admin Only


module.exports = router