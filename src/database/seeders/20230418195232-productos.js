'use strict';

const productsDB = require('../../data/productsDB.json');

const products = productsDB.map(({name,price,discount,description,image,category}) => {
  return {
    name,
    description,
    price,
    discount,
    image,
    categoryId : category === "visited" ? 1 : 2,
    visible : true,
    createdAt : new Date(),
    updatedAt : new Date()
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Products',products, {});
   
  },

  async down (queryInterface, Sequelize) {

      await queryInterface.bulkDelete('Products', null, {});

  }
};
