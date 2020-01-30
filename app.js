const express = require('express')
const app = express()
const port = 3000
const indexRoter = require('./routes')
const session = require('express-session')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))

app.use(session({
  secret: 'haha',
  resave: false,
  saveUninitialized: true
}))

app.use('/', indexRoter)

app.listen(port, _=> console.log('running on port ', port))