const { Category } = require('../models');

const checkValidBlogPost = async (req, res, next) => {
    const { title, content, categoryIds } = req.body;
    if (!title || !content || !categoryIds) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    const existentCategories = await Category.findAll({
      where: {
        id: categoryIds,
      },
    });
    if (existentCategories.length !== categoryIds.length) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }
    next();
  };

  const validatePostUpdate = async (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    next();
  };
module.exports = { 
  checkValidBlogPost,
  validatePostUpdate,
 };