module.exports = (sequelize, dataTypes) => {

    let alias = 'products';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INTEGER
        },
        code: {
            type: dataTypes.STRING
        },
        in_offer: {
            type: dataTypes.BOOLEAN
        },
        line_id: {
            type: dataTypes.INTEGER
        },
        name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.NUMBER
        },
        size: {
            type: dataTypes.INTEGER
        }
    
    };
    
    let config = {
        timestamps: false,
        tableName: 'products'
    };

    
    const Product = sequelize.define(alias, cols, config);


    return Product;
};