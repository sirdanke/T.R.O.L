'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostingTag = sequelize.define('PostingTag', {
    TagId: DataTypes.INTEGER,
    PostingId: DataTypes.INTEGER
  }, {});
  PostingTag.associate = function(models) {
    // associations can be defined here
  };
  return PostingTag;
};