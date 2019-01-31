'use strict';
const request = require('request');

const subscriptionKey = '0d27c53dd6d24ca6a13d5a91f4f5e994';



module.exports = (sequelize, DataTypes) => {
  const Posting = sequelize.define('Posting', {
    path_directory: DataTypes.STRING,
    caption: DataTypes.STRING,
    UserId: DataTypes.STRING
  }, {});
  Posting.associate = function (models) {
    // associations can be defined here
    Posting.belongsTo(models.User)
  };
  // Posting.beforeCreate((post) => {
  //   const uriBase = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect';

  //   const imageUrl = 'https://i.pinimg.com/originals/6b/53/eb/6b53eb8ee50c337ae8af523a24a5a996.jpg' //post.path
  //   const params = {

  //     'returnFaceId': 'true',

  //     'returnFaceLandmarks': 'false',

  //     'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +

  //       'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'

  //   };
  //   const options = {

  //     uri: uriBase,

  //     qs: params,

  //     body: '{"url": ' + '"' + imageUrl + '"}',

  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Ocp-Apim-Subscription-Key': subscriptionKey
  //     }

  //   };

  //   request.post(options, (error, response, body) => {

  //     if (error) {
  //       console.log('Error: ', error);
  //       return;
  //     }

  //     let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  //     console.log('JSON Response\n');
  //     let parsing = JSON.parse(jsonResponse)
  //     console.log(parsing[0].faceAttributes.emotion)
      
  //     // let emotion = parsing.map((e) => {
  //     //   return e.faceAttributes.emotion12

  //     // });
  //     // console.log(emotion,"======================");
      
  //   });
  // })


  return Posting;
};