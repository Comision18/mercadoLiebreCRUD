/* base de datos */
const db = require("../database/models");
const { Op } = require("sequelize");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    // Do the magic

    const inSale = db.Product.findAll({
      where: {
        categoryId: 2,
      },
    });

    const visited = db.Product.findAll({
      where: {
        categoryId: 1,
      },
    });

    Promise.all([inSale, visited])
      .then(([inSale, visited]) => {
        return res.render("index", {
          inSale,
          visited,
          toThousand,
        });
      })
      .catch((error) => console.log(error));
  },
  search: (req, res) => {
    // Do the magic
    const { keywords } = req.query;


    db.Product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
				[Op.substring] : keywords
			},
          },
          {
            description: {
				[Op.substring] : keywords
			},
          },
        ],
      },
    })
		.then(productsFiltered => {
			return res.render("results", {
				productsFiltered,
				toThousand,
				keywords,
			  });
		})
		.catch(error => console.log(error))

   
  },
};

module.exports = controller;
