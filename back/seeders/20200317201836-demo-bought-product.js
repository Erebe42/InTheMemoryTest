const data = require('../data');


module.exports = {
  up: (queryInterface) => {
    data.forEach(element => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });
    return queryInterface.bulkInsert('BoughtProducts', data, {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('BoughtProducts', null, {});
  }
};
