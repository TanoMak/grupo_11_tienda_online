module.exports = (sequelize, dataTypes) => {

    let alias = 'product_size';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_id: {
            type: dataTypes.INTEGER
        },
        size_id: {
            type: dataTypes.INTEGER
        }
    };
    
    let config = {
        timestamps: false,
        tableName: 'product_size'
    };

    
    const ProductSize = sequelize.define(alias, cols, config);


    return ProductSize;
};