'use strict';
const bycript = require('../helpers/bcrypt')
// const secret = require('../helpers/secret')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Posting)
  };

  User.beforeCreate((user) => {
 
    return bycript(user)
      .then(data => {
        user.password = data
      })
      .catch(err => {
        console.log(err);
      })

  })

  return User;
};