const {User, Game, Dlc, GameUser} = require('../models/index')
const GameHelper = require('../helper/gameHelper')

class GameController{
  static findAll(req,res){
    let role = req.session.role 
    // console.log(req.session);
    Game.findAll({include : [Dlc,User]})
    .then(result=> {
      // res.send(result)
      res.render('games', {data:result, role})
    })
    .catch(err=>res.send(err))
  }

  static detailGame(req,res){
    let error = req.query.error
    let idSelect = +req.params.id
    let role = req.session.role 
    Game.findAll({where:{id:idSelect},include : [Dlc]})
    .then(result=> {
      res.render('gameDetail',{data:result[0], role:role, error})
    })
    .catch(err=>res.send(err))
  }

  static editForm(req,res){
    let idSelect = +req.params.id
    Game.findByPk(idSelect)
      .then(result=> {
        let genre = GameHelper.genreToArray(result.genre) 
        res.render('editGames', {data : result, genre:genre})
      })
      .catch(err=> res.send(err))
  }

  static edit(req,res){
  let input = {
    name : req.body.name,
    price : req.body.price,
    rating : req.body.rating,
    genre : req.body.genre
  }
  Game.update(input,{
    where : {
      id:+req.params.id
    }
  })
    .then(_=> {
      res.redirect('/games')})
    .catch(err=> res.send(err))
  }

  static deleteGame(req,res){
    let idDelete = +req.params.id
    Game.destroy({where: {id : idDelete}})
    .then(_=> {
    console.log('sukses')
      res.redirect('/games')})
    .catch(err=> {
      console.log('gagal');
      res.send(err)}) 
  }

  static addForm(req,res){
    res.render('addGames')
  }

  static add(req,res){
    let input = {
      name : req.body.name,
      price : +req.body.price,
      rating : +req.body.rating,
      genre : req.body.genre,
      slug : "",
      url : req.body.url,
      released : req.body.released
    }
    Game.create(input)
      .then(_=> {
        res.redirect('/games')
      })
      .catch(err=> res.send(err))
  }

  static buyGame(req,res){
    let idUser = req.session.userId
    let idGame = +req.params.id
    let wlt = req.session.wallet
    let price = req.params.price
    let change
    if(wlt>price){
      change = wlt-price
      GameUser.create({
        GameId : idGame,
        UserId : idUser
      })
      .then(_=>{
          return User.update({
            wallet : change
          }, {where : {
            id : idUser
          }})
        })
      .then(_=>{
        let resi = GameHelper.resiGenerator(idUser)
        res.render('purchaseOrder', {resi})
      })  
      .catch(err=> {
        res.send(err)})  
    } else {
      res.redirect(`/games/${idGame}/bla-bla?error=uang tidak cukup`)
    }
  }

  static addDLC(req,res){   
    let name = req.body.name
    let GameId = req.params.id
    Dlc.create({name,GameId})
      .then(result=>res.redirect(`/games/${GameId}/bla-bla`))
      .catch(err=>res.send(err))
  }

  static deleteDlc(req,res){
    let idDelete = +req.params.id
    let idGame = +req.params.idGame 
    Dlc.destroy({where:{id:idDelete}})
    .then(result=>res.redirect(`/games/${idGame}/bla-bla`))
    .catch(err=>res.send(err))
  }

}

module.exports = GameController