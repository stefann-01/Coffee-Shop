'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('StavkaNarudzbines', [
      {
        narudzbina_id: 1,
        kafa_id: 1,
        komada: 2,
        jedinicna_cena: 150
      },
      {
        narudzbina_id: 1,
        kafa_id: 2,
        komada: 3,
        jedinicna_cena: 200
      },
      {
        narudzbina_id: 2,
        kafa_id: 2,
        komada: 4,
        jedinicna_cena: 200
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('StavkaNarudzbines', null, {});
  }
};
