const express = require('express')
const router = express.Router()
const Posting = require('../models').Posting
const PostingTags = require('../models').PostingTag
const Tags = require('../models').Tag
const multer = require('multer')
const path = require('path')
const request = require('request');
const { uriBase, params} = require('../helpers/faceRecognition')


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

// router.use(function (req, res, next) {

//   if (req.session.login) {
//     next()
//   } else {
//     res.redirect('/')
//   }
// })

router.get('/', (req, res) => {
  Posting
    .findAll()
    .then((data) => {
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
        res.render('home', { msg: 'Error: File kosong!' })
      } else {
        return Posting
          .create({
            path_directory: req.file.path,
            caption: req.body.caption
          })
          .then((data) => {
            return PostingTags.create({ TagId: req.body.TagId, PostingId: data.id })
          })
          .then(() => {
            res.redirect('/home')
          })
          .catch((err) => {
            console.log(err);

            res.send(err)
          })
      }
    }
  })
})

router.post('/faceRecognition', (req, res) => {


  // const imageUrl = 'http://postsfromthepath.com/wordpress/media/happy-child.jpg';

  // Request parameters.

  const params = {

    'returnFaceId': 'true',

    'returnFaceLandmarks': 'false',

    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +

      'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'

  };



  const options = {

    uri: uriBase,

    qs: params,

    body: '{"url": ' + '"' + req.body.link + '"}',

    headers: {

      'Content-Type': 'application/json',

      'Ocp-Apim-Subscription-Key': process.env.subscriptionKey

    }

  };



  request.post(options, (error, response, body) => {

    if (error) {

      console.log('Error: ', error);

      return;

    }

    let jsonResponse = JSON.stringify(JSON.parse(body), null, ' ');

    console.log('JSON Response\n');

    let parsing = JSON.parse(jsonResponse)
    let array = []
    let emotions = parsing[0].faceAttributes.emotion
    let gender = parsing[0].faceAttributes.gender
    let age = parsing[0].faceAttributes.age
    array.push(emotions)
    var emotionToFind = array.map((e) => {
      let max = Object.values(e).filter(e => e > 0);
      for (let i in e) {
        if (e[i] == max) {
          return i
        }
      }
     })
     
    Tags.findOne({where: {tag_name : emotionToFind[0]}})
    .then(data=> {
      return PostingTags.findAll({where: {TagId : data.id}, include : [{model : Posting}]})
    })
    .then(alldata=> {
      res.render('search', {data : alldata, emotion: emotionToFind[0], gender : gender, age:age})
      // res.send(alldata)
    })
    .catch(err=> {
      res.send(err)
    })
    
  // console.log(parsing[0].faceAttributes.emotion);
  

    // res.send(parsing[0].faceAttributes)



    // console.log(emotion);

    // console.log(parsing[0].faceAttributes.emotion, "========");

  });


})


module.exports = router