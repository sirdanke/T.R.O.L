
const express = require('express')
const router = express.Router()
const model = require('../models')
const Users = model.User
 

router.use(function(req, res, next) {
    res.send(req.session)
    if (req.session.isLoggedIn) {
        next()
    } else {
    res.redirect('/public')
    }
  })


router.get('/home',(req,res)=> {
    // res.send(req.session)
    res.render('home')
})

module.exports = router