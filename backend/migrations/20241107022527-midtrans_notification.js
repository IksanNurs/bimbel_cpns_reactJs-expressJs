'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Create the 'MidtransNotifications' table with the columns as defined in the struct
     */
    await queryInterface.createTable('MidtransNotifications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Orders', // Assuming there's an 'Orders' table with 'id' as the primary key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        index: true,  // index for the order_id column
      },
      order_uuid: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      signature_key: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      transaction_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      transaction_time: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      transaction_status: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      fraud_status: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      payment_type: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      gross_amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      raw: {
        type: Sequelize.TEXT,
        allowNull: true,
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

  async down (queryInterface, Sequelize) {
    /**
     * Revert the table creation
     */
    await queryInterface.dropTable('MidtransNotifications');
  }
};
