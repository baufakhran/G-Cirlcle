const {User, Game, Dlc} = require('../models/index')
const GameHelper = require('../helper/gameHelper')

class GameController{
  static findAll(req,res){
    Game.findAll({include : [Dlc,User]})
    .then(result=> {
      // res.send(result)
      res.render('games', {data:result})
    })
    .catch(err=>res.send(err))
  }

  static detailGame(req,res){
    let idSelect = +req.params.id
    let role = "admin" 
    Game.findByPk(idSelect)
    .then(result=> {
      res.render('gameDetail',{data:result, role:role})
    })
    .catch(err=>res.send(err))
  }

  static editForm(req,res){
    let idSelect = +req.params.id
    Game.findByPk(idSelect)
      .then(result=> {
        let genre = GameHelper.genreToArray(result.genre) 
        console.log(genre);
        res.render('editGames', {data : result, genre:genre})
      })
      .catch(err=> res.send(err))
  }

  static edit(req,res){
  let input = {
    name : req.body.name,
    price : req.body.price,
    rating : req.body.rating,
    genre : GameHelper.genreToString(req.body.genre)
  }
  Game.update(input,{
    where : {
      id:+req.params.id
    }
  })
    .then(_=> {
      // console.log(req.body.genre)
      res.redirect('/games')})
    .catch(err=> res.send(err))
  }

  static deleteGame(req,res){
    let idDelete = req.params.id
    Menu.destroy({where: {idd : idDelete}})
    .then(_=> res.redirect('/games'))
    .catch(err=> res.send(err)) 
  }
}

module.exports = GameController