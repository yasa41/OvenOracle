export default (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    customer_id: { type: DataTypes.INTEGER, allowNull: false },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "preparing", "ready", "delivered", "cancelled"),
      defaultValue: "pending"
    },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    delivery_address: { type: DataTypes.TEXT },
    notes: { type: DataTypes.TEXT }
  }, {
    tableName: "Orders",
    timestamps: true
  });

  return Order;
};
