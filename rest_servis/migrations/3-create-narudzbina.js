'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Narudzbinas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vreme_narucivanja: {
        type: Sequelize.DATE,
        unique: false,
        allowNull: false
      },
      zakazano_vreme: {
        type: Sequelize.DATE,
        unique: false,
        allowNull: true
      },
      status: {
        type: Sequelize.TEXT,
        unique: false,
        allowNull: false
      },
      adresa: {
        type: Sequelize.TEXT,
        unique: false,
        allowNull: false
      },
      telefon: {
        type: Sequelize.TEXT,
        unique: false,
        allowNull: false
      },
      ime_prezime: {
        type: Sequelize.TEXT,
        unique: false,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Narudzbinas');
  }
};