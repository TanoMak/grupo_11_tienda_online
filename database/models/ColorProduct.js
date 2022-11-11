module.exports = (sequelize, dataTypes) => {

    let alias = 'color_product';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        },
        color_id: {

        },
        field: {

        },
        product_id: {

        } 
    
    };
    
    let config = {
        timestamps: false,
        tableName: 'color_product'
    };

    
    const ColorProduct = sequelize.define(alias, cols, config);


    return ColorProduct;
};