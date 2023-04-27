const {getAllProducts,getProductById, storeProduct, updateProduct} = require('../../services/productsService');


module.exports = {
    index : async (req,res) => {

        try {
            let {count, products} = await getAllProducts(req);

            return res.status(200).json({
                ok : true,
                data : {
                    count,
                    products
                }
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss. Error!!"
                }
            })
        }
    },
    show : async (req,res) => {
        try {
            let product = await getProductById(req,req.params.id);

            return res.status(200).json({
                ok : true,
                data : {
                    product
                }
            })

        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss. Error!!"
                }
            })
        }
    },
    store : async (req,res) => {
        
        try {
            /* validaciones */
        
        const {name,description,price,discount,visible,categoryId} = req.body;

        let {id} = await storeProduct({
            name : name.trim(),
            description : description.trim(),
            price,
            discount : discount || 0,
            image : req.file ? req.file.filename : null,
            visible : visible || false,
            categoryId : categoryId || 1,
        });

        let product = await getProductById(req,id)

        return res.status(200).json({
            ok : true,
            data : {
                message : "El producto fue creado con éxito",
                product  
            }
        })   
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss. Error!!"
                }
            })
        }
     
    },
    update : async (req,res) => {
        try {

            /* validaciones */

            const {name,description,price,discount,visible,categoryId} = req.body;

            let result = await updateProduct({
                name : name?.trim(),
                description : description?.trim(),
                price,
                discount,
                image : req.file && req.file.filename,
                visible,
                categoryId,
            },req.params.id);

            let product = await getProductById(req,req.params.id)

            return res.status(200).json({
                ok : true,
                data : {
                    message : result ? "El producto fue actualizado con éxito" : "No hubieron cambios",
                    product  
                }
            })   
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok : false,
                error : {
                    status : error.status || 500,
                    message : error.message || "Upss. Error!!"
                }
            })
        }
    }
}