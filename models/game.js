'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    url: DataTypes.STRING,
    slug: DataTypes.STRING,
    released: DataTypes.STRING
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};