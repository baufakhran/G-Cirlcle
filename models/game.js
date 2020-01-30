'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Game extends Model {}

  Game.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    url: DataTypes.STRING,
    slug: DataTypes.STRING,
    rating:DataTypes.FLOAT,
    released: DataTypes.STRING
  }, {
    sequelize
  })

  // const Game = sequelize.define('Game', {
  // }, {});
  Game.associate = function(models) {
    // associations can be defined here
    Game.belongsToMany(models.User, {through: 'GameUser'})
    Game.hasMany(models.Dlc)
  };
  return Game;
};