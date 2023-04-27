const db = require("../database/models");
const literalQueryUrlImage = require("../helpers/literalQueryUrlImage");

module.exports = {
  getAllProducts: async (req) => {
    try {
      const { count, rows: products } = await db.Product.findAndCountAll({
        include: [
          {
            association: "category",
            attributes: ["name"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "categoryId", "image"],
          include: [literalQueryUrlImage(req, "products", "image", "urlImage")],
        },
      });

      return {
        count,
        products,
      };
    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
  getProductById: async (req, id) => {
    try {
      const product = await db.Product.findByPk(id, {
        include: {
          association: "category",
          attributes: ["name"],
        },
        attributes: {
          exclude: ["createdAt", "updatedAt", "categoryId", "image"],
          include: [literalQueryUrlImage(req, "products", "image", "urlImage")],
        },
      });

      return product;
    } catch (error) {
      console.log(error);
      throw {
        status: 500,
        message: error.message,
      };
    }
  },
  storeProduct: async (productObject) => {

    try {
        let newProduct = await db.Product.create(productObject);
        
        return newProduct

    } catch (error) {
        console.log(error);
        throw {
          status: 500,
          message: error.message,
        };
    }

  },
  updateProduct : async (productObject,id) => {

    try {
        const result = await db.Product.update(
            {
                ...productObject
            },
            {
                where : {
                    id
                }
            })
            return result[0]

    } catch (error) {
        console.log(error);
        throw {
          status: 500,
          message: error.message,
        };
    }

   

  }
};
