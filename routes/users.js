
const express = require('express')
const router = express.Router()
const model = require('../models')
const Users = model.User
 

router.use(function(req, res, next) {

    if (req.session.login) {
        next()
    } else {
        res.redirect('/')
    }
  })


router.get('/',(req,res)=> {
    res.render('home')
})

module.exports = router