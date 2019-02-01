const express = require('express')
const router = express.Router()
const Posting = require('../models').Posting
const PostingTags = require('../models').PostingTag
const Tags = require('../models').Tag
const User = require('../models').User;
const multer = require('multer')
const path = require('path')


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

router.use(function (req, res, next) {
  if (req.session.login) {
    next()
  } else {
    res.redirect('/')
  }
})



router.get('/:username', (req, res) => {
  let user;
  User
    .findOne({
      where: {
        username: req.params.username
      },
      include: [{
        model: Posting
      }]
    })
    .then((result) => {
      user = result
      return result.getTotalPosting()
    })
    .then(total => {
      // console.log(user.Postings);
      res.render('profile', { user, total, card: req.session })
    })
    .catch((err) => {
      res.send(err);
    });
})

router.get('/edit/:id', (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      res.render('edit-profile', { user })
    })
    .catch(err => {
      res.send(err)
    })
})

router.post('/edit/:id', (req, res) => {
  

  console.log(req.body, "===============");
  console.log(req.params.id);
  upload(req, res, (err) => {
    if (err) {
      res.render('home', { msg: err })
    } else {

      

      User.findByPk(req.params.id)
        .then(data => {
          if(req.file == undefined) {
            req.body.profile_directory = data.profile_directory
          } else {
            req.body.profile_directory = req.file.path
          }
          return data.update(req.body)
        })
        .then((user) => {
          // res.send(user)
          res.redirect(`/profile/${req.body.username}`)
        })
        .catch((err) => {
          res.send(err)
        });


    }
  })
  // res.send(req.body)

})


router.get('/delete/:id/:username', (req, res) => {
  Posting.destroy({ where: { id: req.params.id }, individualHooks: true })
    .then(data => {
      res.redirect(`/profile/${req.params.username}`)
    })
    .catch(err => {
      res.send(err)
    })

})




module.exports = router