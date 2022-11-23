module.exports = (sequelize, dataTypes) => {

    // VOLVER A PLANTEAR CON LOS NUEVOS CAMPOS //

    let alias = 'cart_detail_product';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_cart_id: {
            type: dataTypes.INTEGER
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        price: {
            type: dataTypes.INTEGER
        },
        qantity: {
            type: dataTypes.INTEGER
        },
    
    };
    
    let config = {
        timestamps: false,
        tableName: 'cart_detail_product'
    };

    
    const CartDetailProduct = sequelize.define(alias, cols, config);


    return CartDetailProduct;
};