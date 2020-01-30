'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameUser = sequelize.define('GameUser', {
    UserId: DataTypes.INTEGER,
    GameId: DataTypes.INTEGER
  }, {});
  GameUser.associate = function(models) {
    // associations can be defined here
  };
  return GameUser;
};