'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}

  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    wallet: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    hooks : {
      beforeCreate: (data, options) => {
        data.role = "user"
      }   
    }
  })

  // const User = sequelize.define('User', {
  // }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Game, {through: 'GameUser'})
  };
  return User;
};