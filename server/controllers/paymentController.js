import { Payment, Order } from "../models/index.js";
import { success, error } from "../utils/response.js";

export const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    return success(res, payment, "Payment added");
  } catch (err) {
    return error(res, err.message);
  }
};

export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll({
      include: [{ model: Order }]
    });
    return success(res, payments);
  } catch (err) {
    return error(res, err.message);
  }
};
