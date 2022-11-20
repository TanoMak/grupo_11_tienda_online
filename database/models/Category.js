module.exports = (sequelize, dataTypes) => {

    let alias = 'Category';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: dataTypes.STRING
        }};
    
    let config = {
        timestamps: false,
        tableName: 'category_product'
    };

    
    const Category = sequelize.define(alias, cols, config);

    Category.associate = function(models){
        Category.hasMany(models.Product, {
            as : "Product",
            foreignKey : "category_id"
        })
    }


    return Category;
};