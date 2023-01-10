const { CategoryService } = require('../services');

const createCategories = async (req, res) => {
        const category = await CategoryService.createCategory(req.body);
        return res.status(201).json(category);
};

const getAllCategories = async (req, res) => {
    const { id } = req.params;

    const category = await CategoryService.getAllCategories(id);
    if (!category) {
      return res.status(404).json({ message: 'Category does not exist' });
    }
      return res.status(200).json(category);
  };

module.exports = {
    createCategories,
    getAllCategories,
};