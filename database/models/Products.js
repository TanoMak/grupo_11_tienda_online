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

    Product.associate = function(models){
        Product.belongsToMany(models.Images, {
            as: "images",
            through: "image_product",
            foreignKey: "product_id",
            otherKey: "image_id",
            timestamps: false
        });

        Product.belongsToMany(models.Colors, {
            as: "colors",
            through: "color_product",
            foreignKey: "product_id",
            otherKey: "color_id",
            timestamps: false
        });

        Product.belongsToMany(models.Sizes, {
            as: "sizes",
            through: "product_size",
            foreignKey: "product_id",
            otherKey: "size_id",
            timestamps: false
        });

        Product.hasMany(models.ProductCart, {
            as: "productcarts",
            foreignKey: "product_id",
        });

        Product.belongsTo(models.CategoryProduct, {
            as: 'categories',
            foreignKey: 'category_id',
        });

        Product.belongsTo(models.LineProduct, {
            as: 'lines',
            foreignKey: 'line_id',
        });
    }


    return Product;
};