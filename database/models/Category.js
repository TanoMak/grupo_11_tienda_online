module.exports = (sequelize, dataTypes) => {

    let alias = 'Category';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING
        }};
    
    let config = {
        timestamps: false,
        tableName: 'category_product'
    };

    
    const CategoryProduct = sequelize.define(alias, cols, config);


    return CategoryProduct;
};