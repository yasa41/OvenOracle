export default (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    payment_method: {
      type: DataTypes.ENUM("cash", "card", "UPI", "wallet", "online"),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM("pending", "paid", "failed", "refunded", "partial"),
      defaultValue: "pending"
    },
    transaction_id: { type: DataTypes.STRING(100) },
    paid_at: { type: DataTypes.DATE },
    notes: { type: DataTypes.TEXT }
  }, {
    tableName: "Payments",
    timestamps: true
  });

  return Payment;
};
