'use strict';
module.exports = (sequelize, DataTypes) => {
  const Posting = sequelize.define('Posting', {
    path_directory: DataTypes.STRING,
    caption: DataTypes.STRING,
    UserId: DataTypes.STRING
  }, {});
  Posting.associate = function(models) {
    // associations can be defined here
    Posting.belongsTo(models.User)
  };
  // Posting.beforeCreate
  return Posting;
};