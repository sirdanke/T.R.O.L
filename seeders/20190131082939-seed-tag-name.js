'use strict';

let emotion = [{
  tag_name: 'anger',
  createdAt: new Date,
  updatedAt: new Date
},
{
  tag_name: 'contempt',
  createdAt: new Date,
  updatedAt: new Date
},
{
  tag_name : 'disgust',
  createdAt : new Date,
  updatedAt : new Date
},
{
  tag_name : 'fear',
  createdAt : new Date,
  updatedAt : new Date
}, 
{
    tag_name : 'happiness',
    createdAt : new Date,
    updatedAt : new Date
}, 
{
  tag_name : 'neutral',
  createdAt : new Date,
  updatedAt : new Date
} ,
{
  tag_name : 'sadness',
  createdAt : new Date,
  updatedAt : new Date
} ,
{
  tag_name : 'surprise',
  createdAt : new Date,
  updatedAt : new Date
}
]

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Tags', emotion, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Tags', null, {});
  }
};
