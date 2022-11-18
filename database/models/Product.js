module.exports = (sequelize, dataTypes) => {

    let alias = 'Product';

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_code: {
            type: dataTypes.STRING
        },
        line_id: {
            type: dataTypes.INTEGER
        },
        product_name: {
            type: dataTypes.STRING
        },
        price: {
            type: dataTypes.NUMBER
        },
    };

    let config = {
        timestamps: false,
        tableName: 'products'
    };


    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsToMany(models.Image, {
            as: "images",
            through: "image_product",
            foreignKey: "product_id",
            otherKey: "image_id",
            timestamps: false
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
            as: 'categories',
            foreignKey: 'category_id',
        });

        Product.belongsTo(models.Line, {
            as: 'lines',
            foreignKey: 'line_id',
        });
    }


    return Product;
};