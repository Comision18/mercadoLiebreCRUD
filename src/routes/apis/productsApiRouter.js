const router = require('express').Router();

// ************ Controller Require ************
const {index, show, store, update} = require('../../controllers/apis/productsApiController');
const { uploadImage } = require('../../middlewares/upLoadImageProduct');

/* /api/products */
router
    .get('/', index)
    .get('/:id',show)
    .post('/',uploadImage.single('image'),store)
    .put('/:id',uploadImage.single('image'),update)

module.exports = router;
