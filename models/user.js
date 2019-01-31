'use strict';
const bycript = require('../helpers/bcrypt')
// const secret = require('../helpers/secret')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    secret: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    User.hasMany(models.Posting)
    // User.belongsT(models.PostingTag)
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