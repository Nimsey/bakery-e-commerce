'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('tasks', 'status', 'priority');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('tasks', 'priority', 'status');
  }
};
