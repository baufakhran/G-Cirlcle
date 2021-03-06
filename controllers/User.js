const { User, Game, GameUser } = require('../models')

class UserController {
   static getProfile(req, res) {
      let id = +req.params.id
      User.findOne({
         include : [ Game ],
         where : {
            id
         }
      })
         .then(profile => {
            let games = []
            profile.Games.forEach(game => {
               games.push(game.name)
            })

            res.render('profile', { profile, games, users: req.users })
         })
         .catch(err => {
            res.render('error', { err })
         })
   }

   static getFormEdit(req, res) {
      let idSearch = +req.params.id
      User.findOne({
         include : [ Game ],
         where : {
            id:idSearch
         }
      })
         .then(profile => {
            // console.log(profile);
            res.render('editProfile', { profile, users: req.users })
         })
         .catch(err => {
            res.render('error', { err })
         })
   }

   static updateUser(req, res) {
      let id = +req.params.id
      let { username, email, phone_number } = req.body
      let input = { username, email, phone_number }
      User.update(input, {
         where: {
            id
         }
      })
         .then(profile => {
            res.redirect(`/profile/${id}`)
         })
         .catch(err => {
            res.render('error', { err })
         })
   }

   static getDeleteForm(req, res) {
      // console.log(req.params)
      let id = +req.params.id
      res.render('deactivateAccount', { id, users: req.users })
   }

   static deleteData(req, res) {
      let id = +req.params.id
      console.log(id)
      User.findOne({
         where : {
            id,
            username : req.body.username,
            password : req.body.password     
         }
      })
         .then(account => {
            console.log(account)
            User.destroy({
               where : {
                  id
               }
            })
               .then(data => res.redirect('/'))
               .catch(err => res.redirect('error', { err }))
         })
         .catch(err => res.redirect('error', { err }))
   }

   static getLoginForm (req, res) {
      let failed = req.query.keyword
      // console.log(failed)
      if(failed === 'failed') {
         let err = 'Wrong username/password'
         failed = ''
         res.render('auth', { err, users: req.users })
      } else {
         res.render('auth', { err : '', users: req.users})
      }
   }

   static login(req, res) {
      User.findOne({
         where : {
            username : req.body.username,
            password : req.body.password
         }
      })
         .then(data => {
            // console.log(data)
            if(data.length === 0) {
               res.redirect('/login?keyword=failed')
            } else{
               //req.session
               // console.log(data)
               req.session.userId = data.id
               req.session.username = data.username
               req.session.role = data.role
               req.session.wallet = data.wallet
               req.session.isLogin = true
               req.session.wallet = data.wallet
               // console.log(req.session)
               res.redirect(`/`)
            }
         })
         .catch(err =>{ 
            res.redirect('/login?keyword=failed')
         })
   }

   static getFormRegister(req, res) {
      res.render('register', { users: req.users })
   }

   static register(req, res) {
      let { username, password, email, phone_number } = req.body
      let input = { username, password, email, phone_number}
      User.create(input)
         .then(data => {
            res.redirect('/login')
         })
         .catch(err => res.render('error', { err }))
   }

   static getAllUser(req, res) {
      User.findAll({
         where : {
            role: 'user'
         },
         include : [Game]
      })
         .then(data => {
            let gamesInUser = []
            data.forEach(game => {
               let userGame = {}
               let games = []
               game.Games.forEach(el => {
                  games.push(el.name)
               })
               let name = game.username
               userGame[name] = games
               gamesInUser.push(userGame)
            })
            // res.send(gamesInUser)
            // if(data.dataValues.Games.length !== 0) {
               res.render('users', { data, gamesInUser, users: req.users })
            // }
         })
         .catch(err => {
            res.render('error', { err })
         })
   }

   static logOut(req, res) {
      // req.session = {}
      req.session.userId = null
      req.session.username = null
      req.session.role = null
      req.session.wallet = null
      req.session.isLogin = false
      req.session.wallet = null
      res.redirect('/?status=berhasil-log-out')
   }

   static topUpForm(req,res){
     let id = req.session.userId
     res.render('topUpForm', { id, users: req.users })
   }

   static topUp(req,res){
    let id = req.session.userId
    let initWallet = req.session.wallet
     let amount = +req.body.wallet 
     let input = {wallet:amount+initWallet}
     req.session.wallet = input
     User.update(input, {where : {id}})
      .then(_=> res.redirect(`/profile/${id}`))
      .catch(_=> res.send(err))
   }
}

module.exports = UserController