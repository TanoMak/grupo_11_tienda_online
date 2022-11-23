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
        timestamps: true,
        tableName: 'category_product',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid : true
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