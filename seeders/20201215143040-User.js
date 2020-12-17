'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Users', [{
      name: 'lethanhdat',
      old: '20',
      vitri: 'tienve',
      img: 'thanhdat.jpg',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
