module.exports = (sequelize, dataTypes) => {
  // VOLVER A PLANTEAR CON LOS NUEVOS CAMPOS //

  let alias = "Order";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    subtotal: {
      type: dataTypes.INTEGER,
    },
    delivery_cost: {
      type: dataTypes.INTEGER,
    },
    total_order: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "orders",
    timestamps: false,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
  };

  const Order = sequelize.define(alias, cols, config);

  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      as: "User",
      foreignKey: "users_id",
    });
  };
  return Order;
};