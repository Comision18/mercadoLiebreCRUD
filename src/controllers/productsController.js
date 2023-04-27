const db = require('../database/models')


const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic

		db.Product.findAll()
			.then(products => {
				return res.render('products',{
					products,
					toThousand
				})
			})
			.catch(error => console.log(error))
	
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		const {id} = req.params;

		db.Product.findByPk(id)
			.then(product => {
				return res.render('detail',{
					...product.dataValues,
					toThousand
				})
			})
			.catch(error => console.log(error))
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		db.Category.findAll()
			.then(categories => {
				return res.render('product-create-form',{
					categories
				})
			})
			.catch(error => console.log(error))

	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		const {name, discount, price, description,category} = req.body;

		db.Product.create({
			name : name.trim(),
			discount,
			price,
			description : description.trim(),
			categoryId : category,
			image : "default-image.png",
			visible : true
		})
			.then(product => {
				console.log(product);
				return res.redirect('/products')
			})
			.catch(error => console.log(error))

	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const {id} = req.params;

		const product = db.Product.findByPk(id)
		const categories = db.Category.findAll()

		Promise.all([product,categories])
			.then(([product,categories]) => {
				return res.render('product-edit-form',{
					...product.dataValues,
					categories
				})
			})
			.catch(error => console.log(error))
	
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const {id} = req.params;
		const {name, discount, price, description,category} = req.body;

		db.Product.update(
			{
				name : name.trim(),
				discount,
				price,
				description : description.trim(),
				categoryId : category,
			},
			{
				where : {
					id
				}
			}
		)
			.then(() => {
				return res.redirect('/products/detail/' + id)

			})
			.catch(error => console.log(error))
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic

		const {id} = req.params;

		db.Product.destroy({
			where : {
				id
			}
		})
			.then(() => {
				return res.redirect('/products')

			})
			.catch(error => console.log(error))

		

	}
};

module.exports = controller;