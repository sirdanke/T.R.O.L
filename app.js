const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const Public = require('./routes/public')
const User = require('./routes/users')
const Profile = require('./routes/profile');
require('dotenv').config()

// Session
app.use(session({
  secret: 'keyboard cat',
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(express.static('./public'))


app.use('/', Public)
app.use('/home', User)
app.use('/profile', Profile)

app.listen(port, function () {
  console.log('running in port ' + port);
})
