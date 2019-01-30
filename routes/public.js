const express = require('express')
const router = express.Router()
const model = require('../models')
const Users = model.User



router.get('/', (req,res)=> {
    res.render('login')
})

router.post('/',(req,res)=> {
    Users.findOne({where : req.body})
    .then(data => {
        req.session.isLoggedIn = {
            username : req.body.username
        }
        res.send(req.session)
        res.redirect('/users/home')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/sign_up', (req,res)=> {
    res.render('signup')
})


module.exports = router