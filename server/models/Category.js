export default (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    description: { type: DataTypes.TEXT }
  }, {
    tableName: "Categories",
    timestamps: true
  });

  return Category;
};
