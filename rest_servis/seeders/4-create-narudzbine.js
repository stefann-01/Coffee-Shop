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

    await queryInterface.bulkInsert('Narudzbinas', [
      {
        id: "1",
        vreme_narucivanja: new Date(),
        zakazano_vreme: new Date(),
        status: 'U dostavi',
        adresa: 'Ilije Garašanina 23',
        telefon: '0632546896',
        ime_prezime: 'Jovan Marić'
      },
      {
        id: "2",
        vreme_narucivanja: new Date(),
        zakazano_vreme: new Date(),
        status: 'Isporučeno',
        adresa: 'Požeška 34',
        telefon: '062275658',
        ime_prezime: 'Jana Tipsarević'
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

    await queryInterface.bulkDelete('narudzbinas', null, {});
  }
};
