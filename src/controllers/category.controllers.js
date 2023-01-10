const { CategoryService } = require('../services');

const createCategories = async (req, res) => {
        const category = await CategoryService.createCategory(req.body);
        return res.status(201).json(category);
};

module.exports = {
    createCategories,
};