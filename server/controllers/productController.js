import { Product, Category } from "../models/index.js";
import { success, error } from "../utils/response.js";

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return success(res, product, "Product created");
  } catch (err) {
    return error(res, err.message);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }]
    });
    return success(res, products);
  } catch (err) {
    return error(res, err.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.update(req.body, { where: { id } });

    return success(res, null, "Product updated");
  } catch (err) {
    return error(res, err.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.destroy({ where: { id } });

    return success(res, null, "Product deleted");
  } catch (err) {
    return error(res, err.message);
  }
};
