'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Create the 'Bundles' table with the columns as defined in the struct
     */
    await queryInterface.createTable('Products', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,  // nullable because it can be nil in the struct
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      is_active: {
        type: Sequelize.INTEGER,
        defaultValue: 1,  // Default value based on the GORM struct
        allowNull: true,  // It can be nullable as it's a flag
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
          model: 'Users', // Assuming 'Users' table exists
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'Users', // Assuming 'Users' table exists
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Revert the table creation
     */
    await queryInterface.dropTable('Products');
  }
};
