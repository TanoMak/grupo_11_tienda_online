module.exports = (sequelize, dataTypes) => {

    let alias = 'product_cart';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_cart_detail_id: {
            type: dataTypes.INTEGER
        },
        user_id: {
            type: dataTypes.INTEGER
        },
            
    };
    
    let config = {
        timestamps: false,
        tableName: 'product_cart'
    };

    
    const CategoryProduct = sequelize.define(alias, cols, config);


    return CategoryProduct;
};