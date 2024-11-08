'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.INTEGER,  // Storing as Unix timestamp (in seconds)
        allowNull: false,
        defaultValue: Sequelize.literal('EXTRACT(EPOCH FROM NOW())'),  // Get the current Unix timestamp in seconds
      },
      updated_at: {
        type: Sequelize.INTEGER,  // Storing as Unix timestamp (in seconds)
        allowNull: false,
        defaultValue: Sequelize.literal('EXTRACT(EPOCH FROM NOW())'),  // Get the current Unix timestamp in seconds
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};