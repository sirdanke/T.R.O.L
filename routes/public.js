const express = require('express')
const router = express.Router()
const model = require('../models')
const Users = model.User
const bcrypt = require('bcrypt')
// const bcrypt = require('../helpers/bcrypt')



router.get('/', (req,res)=> {
    res.render('login')
})


router.post('/',(req,res)=> {
    let data = ''
    Users.findOne({where : { username : req.body.username}})
    .then(userData => {
        data = userData
        return bcrypt.compare(req.body.password, data.password)
    })
    .then(status => {
        if(status == true) {
            req.session.login = {
                username : data.username,
                id : data.id
            }
            res.redirect('/home')
        } else {
            throw 'password wrong'
        }
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/sign_up', (req,res)=> {
    res.render('signup')
})

router.post('/sign_up', (req,res)=> {
    Users.create(req.body)
    .then(data => {
        res.redirect('/home')
    })
    .catch(err => {
        res.send(err)
    })
})

router.get('/logout', (req,res)=> {
    req.session.destroy(function(err) {
        if(err) {
            res.send(err)
        } else {
            res.redirect('/')
        }
      })
})
module.exports = router