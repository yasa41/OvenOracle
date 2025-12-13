import { Customer } from "../models/index.js";
import { success, error } from "../utils/response.js";

export const createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    return success(res, customer, "Customer created");
  } catch (err) {
    return error(res, err.message);
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    return success(res, customers);
  } catch (err) {
    return error(res, err.message);
  }
};
