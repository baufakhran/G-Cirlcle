const {User, Game, Dlc, GameUser} = require('../models/index')
const GameHelper = require('../helper/gameHelper')

class GameController{
  static findAll(req,res){
    console.log(req.session);
    Game.findAll({include : [Dlc,User]})
    .then(result=> {
      // res.send(result)
      res.render('games', {data:result})
    })
    .catch(err=>res.send(err))
  }

  static detailGame(req,res){
    let idSelect = +req.params.id
    let role = "admin" //req.session.role 
    Game.findAll({where:{id:idSelect},include : [Dlc]})
    .then(result=> {
      // res.send(result)
      // let dlc = GameHelper.dlcToString(result[0].Dlcs)
      // console.log(dlc);
      res.render('gameDetail',{data:result[0], role:role})
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
    let idUser = 4//req.session.userId
    let idGame = req.params.id
    let wlt = 100000//req.session.wallet
    let price = req.params.price
    let change
    console.log('buy')
    if(wlt>price){
      change = wlt-price
      GameUser.create({
        GameId :idGame,
        UserId :idUser
      })
      .then(_=>{
          console.log('sukses1');
          
          return User.update({
            wallet : change
          }, {where : {
            id : idUser
          }})
        })
      .then(_=>{
        console.log('sukses2');
        let resi = GameHelper.resiGenerator(idUser)
        res.render('purchaseOrder', {resi})
      })  
      .catch(err=> {
        console.log('error');
        res.send(err)})  
    } else {
      res.send('uang tidak cukup')
    }
  }

  static addDLC(req,res){
    console.log(req.body)   
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