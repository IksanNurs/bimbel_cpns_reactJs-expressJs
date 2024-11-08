'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Create the 'Orders' table with the columns as defined in the struct
     */
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      uuid: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',  // Assuming there's a 'Users' table with 'id' as the primary key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        index: true,  // index for faster querying by user_id
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Products',  // Assuming there's a 'Products' table with 'id' as the primary key
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        index: true,  // index for faster querying by product_id
      },
      transaction_id: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      cancelled_at: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_active: {
        type: Sequelize.INTEGER,
        defaultValue: 1,  // Default value for active status
        allowNull: true,
      },
      expired_at: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      checked_out_at: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      midtrans_payment_token: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      midtrans_payment_url: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      paid_at: {
        type: Sequelize.INTEGER,
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
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',  // Assuming 'Users' table exists
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        index: true,
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users',  // Assuming 'Users' table exists
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        index: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Revert the table creation
     */
    await queryInterface.dropTable('Orders');
  }
};
