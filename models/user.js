'use strict';
const bycript = require('../helpers/bcrypt')
// const secret = require('../helpers/secret')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    username: { type : DataTypes.STRING,
      validate : {
     
        isUnique  : function(value) {
          return User.findOne({ where : { username : value}})
          .then(data => {
            if(data != undefined) {
              throw 'Username has already registered'
            }
          })
          .catch(err => {
            throw err
          })
        }
      }
    },
    password: DataTypes.STRING,
    email: { type : DataTypes.STRING,
      validate : {
        isEmail : {
          args : true,
          msg : 'your email format is wrong'
        },
        isUnique  : function(value) {
          return User.findOne({ where : { email : value}})
          .then(data => {
            if(data != undefined) {
              throw 'Email has already registered'
            }
          })
          .catch(err => {
            throw err
          })
        }
      }
    },
    profile_directory: DataTypes.STRING
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Posting)
  };
  User.prototype.getTotalPosting = function() {
    return this.Postings.length
  }

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