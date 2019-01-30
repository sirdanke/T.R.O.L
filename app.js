const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const Public = require('./routes/public')
const User = require('./routes/users')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))



app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


app.use('/public', Public)
app.use('/users', User)

app.listen(port,function() {
    console.log('running in port '+port); 
})
