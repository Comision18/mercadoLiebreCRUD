const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : function (req,file,callback) {
        callback(null, 'public/images/products')
    },
    filename : function (req,file,callback) {
        callback(null,`${Date.now()}_products_${path.extname(file.originalname)}`)
    }
});


const uploadImage = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if(!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)){
            req.fileValidationError = "Solo se permite imágenes";
            return cb(null,false,req.fileValidationError);
        }
    
        cb(null, true)
      }
});

module.exports = {
    uploadImage,
}