const express = require('express')
const app = express()
const port = 3000
const session = require('express-session')
const Public = require('./routes/public')
const User = require('./routes/users')

app.use(session({
  secret: 'keyboard cat',
}))



app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))


app.use('/', Public)
app.use('/home', User)

app.listen(port,function() {
    console.log('running in port '+port); 
})
