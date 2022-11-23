module.exports = (sequelize, dataTypes) => {

    let alias = 'Product';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        product_code: {
            type: dataTypes.STRING
        },
        product_name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.NUMBER
        },
        description : {
            type : dataTypes.STRING
        },




    };

    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid : true
    };


    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.hasMany(models.Image, {
            as: "images",
            foreignKey: "product_id"
        });

        Product.belongsToMany(models.Color, {
            as: "colors",
            through: "color_product",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: false
        });

        Product.belongsToMany(models.Size, {
            as: "sizes",
            through: "product_size",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
        });

/*         Product.hasMany(models.ProductCart, {
            as: "productcarts",
            foreignKey: "product_id",
        }); */

        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'category_id',
        });

        Product.belongsTo(models.Line, {
            as: 'line',
            foreignKey: 'line_id',
        });
    }


    return Product;
};