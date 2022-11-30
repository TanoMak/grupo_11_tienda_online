module.exports = (sequelize, dataTypes) => {
  let alias = "cart_detail_product";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    quantity: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tablename: "orders_details",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  };

  const CartDetailProduct = sequelize.define(alias, cols, config);

  /* CartDetailProduct.associate = (models) => {
    CartDetailProduct.hasMany(models.Color, {
        as: "colors",
        foreignKey: "item_color_id"
    })
    CartDetailProduct.hasMany(models.Size, {
        as: "sizes",
        foreignKey: "item_size_id"
    }) 
    CartDetailProduct.belongsTo(models.Order, {
        as: "orders",
        foreignKey: "order_id"
    })
    CartDetailProduct.hasMany(models.Product, {
        as: "products",
        foreignKey: "product_code"
    })
    CartDetailProduct.hasMany(models.colors, {
        as: "colors",
        foreignKey: "item_color_id"
    })
    CartDetailProduct.belongsTo(models.User, {
        as: "User",
        foreignKey: "user_id",
      });
  }; */

  return CartDetailProduct;
};