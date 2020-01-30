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

            res.render('profile', { profile, games })
         })
         .catch(err => {
            res.render('error', { err })
         })
   }

   static getFormEdit(req, res) {
      id = +req.params.id
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

            res.render('profile', { profile, games })
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
            res.redirect('/profile')
         })
         .catch(err => {
            res.render('error', { err })
         })
   }

   static getDeleteForm(req, res) {
      // console.log(req.params)
      let id = +req.params.id
      res.render('deactivateAccount', { id })
   }

   static deleteData(req, res) {
      let id = +req.params.id
      User.findOne({
         where : {
            id,
            username : req.body.username,
            password : req.body.password     
         }
      })
         .then(account => {
            return User.destroy({
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
         res.render('auth', { err })
      } else {
         res.render('auth', { err : ''})
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
               req.session.isLogin = true
               req.session.wallet = data.wallet
               // console.log(req.session)
               res.redirect('/')
            }
         })
         .catch(err =>{ 
            res.redirect('/login?keyword=failed')
         })
   }

   static getFormRegister(req, res) {
      res.render('register')
   }

   static register(req, res) {
      let { username, password, email, phone_number } = req.body
      let input = { username, password, email, phone_number}
      User.create(input)
         .then(data => {
            // console.log(data)
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
            // res.send(data)
            let gamesInUser = []
            data.forEach(game => {
               // res.send(game.username)
               let userGame = {}
               let games = []
               game.Games.forEach(el => {
                  games.push(el.name)
                  // res.send(games)
               })
               let name = game.username
               userGame[name] = games
               // res.send(userGame)
               gamesInUser.push(userGame)
            })
            // res.send(gamesInUser)
            // if(data.dataValues.Games.length !== 0) {
               res.render('users', { data, gamesInUser })
            // }
         })
         .catch(err => {
            res.render('error', { err })
         })
   }

   static logOut(req, res) {
      req.session = {}
      res.redirect('/')
   }
}

module.exports = UserController