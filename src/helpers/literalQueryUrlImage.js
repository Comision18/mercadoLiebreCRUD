const {literal} = require('sequelize');

module.exports = (req,entity,nameImage,field) =>{
    const urlImage = req => `${req.protocol}://${req.get('host')}/images/${entity}/`

    return [literal(`CONCAT('${urlImage(req)}',${nameImage})`),field]
}