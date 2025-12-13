export default (sequelize, DataTypes) => {
  const Customer = sequelize.define("Customer", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING(100), unique: true },
    phone: { type: DataTypes.STRING(15) },
    address: { type: DataTypes.TEXT }
  }, {
    tableName: "Customers",
    timestamps: true
  });

  return Customer;
};
