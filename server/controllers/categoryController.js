import { Category } from "../models/index.js";
import { success, error } from "../utils/response.js";

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return success(res, category, "Category created");
  } catch (err) {
    return error(res, err.message);
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return success(res, categories);
  } catch (err) {
    return error(res, err.message);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.update(req.body, { where: { id } });

    return success(res, null, "Category updated");
  } catch (err) {
    return error(res, err.message);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.destroy({ where: { id } });

    return success(res, null, "Category deleted");
  } catch (err) {
    return error(res, err.message);
  }
};
