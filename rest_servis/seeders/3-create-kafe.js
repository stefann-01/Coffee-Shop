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

    await queryInterface.bulkInsert('kafas',
        [
          {id:"1",naziv:"Indija-100g", opis:"Dark roast.", cena: 430, kategorija_id:1},
          {id:"2",naziv:"Nigerija", opis:"Light roast, aroma vanile.", cena: 580, kategorija_id:2}
        ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('kafas', null, {});
  }
};
