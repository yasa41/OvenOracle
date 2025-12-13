export default (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    category_id: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING(255) },
    is_available: { type: DataTypes.BOOLEAN, defaultValue: true },
    stock_quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    tableName: "Products",
    timestamps: true
  });

  return Product;
};
