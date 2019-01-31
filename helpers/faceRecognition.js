// const request = require('request');



const uriBase = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/detect';


const params = {

    'returnFaceId': 'true',

    'returnFaceLandmarks': 'false',

    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +

        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'

};



module.exports = { uriBase, params}
