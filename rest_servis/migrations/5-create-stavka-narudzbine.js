'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StavkaNarudzbines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      narudzbina_id: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
      },
      kafa_id: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
      },
      komada: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
      },
      jedinicna_cena: {
        type: Sequelize.INTEGER,
        unique: false,
        allowNull: false
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StavkaNarudzbines');
  }
};