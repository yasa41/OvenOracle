import {
  Order,
  OrderDetail,
  Product,
  Customer
} from "../models/index.js";
import { success, error } from "../utils/response.js";

export const createOrder = async (req, res) => {
  const { customer_id, items, delivery_address, notes } = req.body;

  try {
    // 1️⃣ Create Order
    const order = await Order.create({
      customer_id,
      delivery_address,
      notes,
      total_amount: 0
    });

    let total = 0;

    // 2️⃣ Create OrderDetails for each item
    for (const item of items) {
      const product = await Product.findByPk(item.product_id);

      if (!product) {
        return error(res, `Product not found: ${item.product_id}`);
      }

      const subtotal = item.quantity * product.price;

      await OrderDetail.create({
        order_id: order.id,
        product_id: product.id,
        quantity: item.quantity,
        unit_price: product.price,
        subtotal
      });

      total += subtotal;

      // 3️⃣ Reduce stock
      await product.update({
        stock_quantity: product.stock_quantity - item.quantity
      });
    }

    // 4️⃣ Update total amount
    await order.update({ total_amount: total });

    return success(res, order, "Order created successfully");
  } catch (err) {
    return error(res, err.message);
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Customer },
        { model: OrderDetail, include: [Product] }
      ]
    });
    return success(res, orders);
  } catch (err) {
    return error(res, err.message);
  }
};
