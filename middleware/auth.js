class Authentication {
   static checkAdmin(req, res, next) {
      if(req.session.isLogin) {
         if(req.session.role === 'admin') {
            next()
         } else {
            res.redirect('/')
         }
      } else {
         next('you must login to see this')
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
         next('you must login to see this')
      }
   }

   static isLogin (req,res,next){
    console.log(req.session);
    if(!req.session.isLogin){
      res.redirect('/login?error=You Must Login')    
    } else{
      console.log(req.session, "fromauth");
      next()
    }
  }
}

module.exports = Authentication