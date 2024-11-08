const bcrypt = require ('bcrypt');
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Users', [
        {
          email: 'admin@gmail.com',
          password: await bcrypt.hash('admin', 10),
          role: 'admin',
          createdAt: Math.floor(Date.now() / 1000),  // Unix timestamp
          updatedAt: Math.floor(Date.now() / 1000)   // Unix timestamp
      },
      {
          email: 'viewer@gmail.com',
          password: await bcrypt.hash('viewer', 10),
          role: 'viewer',
          createdAt: Math.floor(Date.now() / 1000),  // Unix timestamp
          updatedAt: Math.floor(Date.now() / 1000)   // Unix timestamp
      }
        ,
      ], {});
    

  },

  async down (queryInterface, Sequelize) {
 
    await queryInterface.bulkDelete('Users', null, {});
  }
};
