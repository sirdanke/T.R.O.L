'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posting = sequelize.define('Posting', {
    path_directory: DataTypes.STRING,
    caption: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Posting.associate = function(models) {
    // associations can be defined here
    Posting.belongsTo(models.User)
    Posting.hasMany(models.PostingTag)
  };

  Posting.beforeDestroy((posting)=>{
    console.log(posting);
    
    sequelize.models.PostingTag
    .destroy({where : {PostingId : posting.id }})
    .then(data=> {
      console.log('masuk sini');  
    })
    .catch(err=> {
      throw err
    })
  })
  return Posting;
};