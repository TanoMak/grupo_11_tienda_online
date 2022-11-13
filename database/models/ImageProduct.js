module.exports = (sequelize, dataTypes) => {

    let alias = 'image_product';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        image_id: {
            type: dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER
        }
    };
    
    let config = {
        timestamps: false,
        tableName: 'image_product'
    };

    
    const ImageProduct = sequelize.define(alias, cols, config);


    return ImageProduct;
};