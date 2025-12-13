import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

import CategoryModel from "./Category.js";
import ProductModel from "./Product.js";
import CustomerModel from "./Customer.js";
import OrderModel from "./Order.js";
import OrderDetailModel from "./OrderDetail.js";
import PaymentModel from "./Payment.js";

// Initialize models
const Category = CategoryModel(sequelize, DataTypes);
const Product = ProductModel(sequelize, DataTypes);
const Customer = CustomerModel(sequelize, DataTypes);
const Order = OrderModel(sequelize, DataTypes);
const OrderDetail = OrderDetailModel(sequelize, DataTypes);
const Payment = PaymentModel(sequelize, DataTypes);

/* Relationships */

// Category → Products
Category.hasMany(Product, { foreignKey: "category_id", onDelete: "RESTRICT" });
Product.belongsTo(Category, { foreignKey: "category_id", onDelete: "RESTRICT" });

// Customer → Orders
Customer.hasMany(Order, { foreignKey: "customer_id", onDelete: "CASCADE" });
Order.belongsTo(Customer, { foreignKey: "customer_id", onDelete: "CASCADE" });

// Orders → OrderDetails
Order.hasMany(OrderDetail, { foreignKey: "order_id", onDelete: "CASCADE" });
OrderDetail.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE" });

// Products → OrderDetails
Product.hasMany(OrderDetail, { foreignKey: "product_id", onDelete: "RESTRICT" });
OrderDetail.belongsTo(Product, { foreignKey: "product_id", onDelete: "RESTRICT" });

// Orders → Payments
Order.hasMany(Payment, { foreignKey: "order_id", onDelete: "CASCADE" });
Payment.belongsTo(Order, { foreignKey: "order_id", onDelete: "CASCADE" });

export {
  sequelize,
  Category,
  Product,
  Customer,
  Order,
  OrderDetail,
  Payment
};
