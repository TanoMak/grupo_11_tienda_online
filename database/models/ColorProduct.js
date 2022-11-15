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
            type: dataTypes.INTEGER
        },
        field: {

        },
        product_id: {
            type: dataTypes.INTEGER
        } 
    
    };
    
    let config = {
        timestamps: false,
        tableName: 'color_product'
    };

    
    const ColorProduct = sequelize.define(alias, cols, config);


    return ColorProduct;
};