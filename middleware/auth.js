class Authentication {
   static checkAdmin(req, res, next) {
      if(req.session.isLogin) {
         if(req.session.role === 'admin') {
            next()
         } else {
            res.redirect('/')
         }
      } else {
         next('You must login to see this')
      }
   }

   static checkUser(req, res, next) {
      if(req.session.isLogin) {
         if(req.session.role === 'user' || req.session.role === 'admin') {
            next()
         } else {
            res.redirect('/')
         } 
      } else {
         next('You must login to see this')
      }
   }

   static checkLogin(req, res, next) {
      if(req.session.isLogin) {
         next()
      } else {
         next('You must login to see this')
      }
   }
}

module.exports = Authentication