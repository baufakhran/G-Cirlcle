'use strict';

const fs = require('fs')
const games = JSON.parse(fs.readFileSync('./data/game.json','utf8'))
const games1 = JSON.parse(fs.readFileSync('./data/game2.json','utf8'))

games1.forEach(el => {
  games.push(el)
});

games.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
});


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Games', games, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Games', null, {});
  }
};
