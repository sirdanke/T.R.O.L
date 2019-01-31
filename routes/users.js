const express = require('express')
const router = express.Router()
const Posting = require('../models').Posting
const multer = require('multer')
const path = require('path')
const User = require('../models').User

// setup storage
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// setup upload
const upload = multer({
  storage: storage
}).single('img')

// router.use(function(req, res, next) {

//     if (req.session.login) {
//         next()
//     } else {
//         res.redirect('/')
//     }
//   })

router.get('/', (req, res) => {
  Posting
    .findAll()
    .then((data) => {
      // data.getUser()
      res.render('home', { data })
    })
    .catch((err) => {
      res.send(err)
    });
})

router.post('/', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.render('home', { msg: err })
    } else {
      if (!req.file) {
        Posting
          .findAll()
          .then((data) => {
            res.render('home', { data, msg: 'Error: No file selected!' })
          })
          .catch((err) => {
            res.send(err);
          });
      } else {
        Posting
          .create({
            path_directory: req.file.path,
            caption: req.body.caption,
            UserId: req.session.login.id
          })
          .then(() => {
            res.redirect('/home')
          })
          .catch((err) => {
            res.send(err)
          })
      }
    }
  })
})

module.exports = router