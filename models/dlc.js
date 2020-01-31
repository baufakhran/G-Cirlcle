'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dlc = sequelize.define('Dlc', {
    name: DataTypes.STRING,
    GameId: DataTypes.INTEGER
  }, {});
  Dlc.associate = function(models) {
    // associations can be defined here
    Dlc.belongsTo(models.Game)
  };
  return Dlc;
};