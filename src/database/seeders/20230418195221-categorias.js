'use strict';

const categoriesDB = require('../../data/categoriesDB.json');

const categories = categoriesDB.map(category => {
  return {
    name : category.name,
    createdAt : new Date(),
    updatedAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Categories',categories, {});
   
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Categories', null, {});

  }
};
