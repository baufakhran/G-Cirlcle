'use strict';
const fs = require('fs')
const dlc = JSON.parse(fs.readFileSync('./data/dlc.json', 'utf8'))
dlc.forEach(el => {
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
   return queryInterface.bulkInsert('Dlcs',dlc, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Dlcs', null, {});
    */
   return queryInterface.bulkDelete('Dlcs', null, {});
  }
};
