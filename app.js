const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const Public = require('./routes/public')
const User = require('./routes/users')

// Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static('./public'))


app.use('/', Public)
app.use('/home', User)

app.listen(port, function () {
  console.log('running in port ' + port);
})
