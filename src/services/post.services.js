// const { Op } = require('sequelize');
const { Category, BlogPost, User } = require('../models');

const verifyIfAllCategoriesExist = async (categoryIds) => {
     const AllCategoriesExist = await Category.findAll({
    where: { id: categoryIds },
    });
    const reqCategories = categoryIds.length;
    const CategoriesNotFound = AllCategoriesExist !== reqCategories;
    if (CategoriesNotFound) {
    const newError = new Error('one or more "categoryIds" not found');
    newError.status = 400;
    throw newError;
    }
    };

    const addCategorie = async (newBlogPost, categoryIds) => {
      await newBlogPost.addCategories(categoryIds);
  };

  const createPost = async ({ userId, title, content, categoryIds }) => {
    await verifyIfAllCategoriesExist(categoryIds);
    const newBlogPost = await BlogPost.create({ userId, title, content });
    await addCategorie(newBlogPost, categoryIds);
    return newBlogPost;
  };
  const getAllPosts = async () => {
    const allPosts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!allPosts) return { message: 'Posts not found' };
    return allPosts;
  };

  const getPostById = async (id) => {
    try {
    const post = await BlogPost.findByPk(id, {
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    ],
    });
    if (!post) {
    throw new Error('Post does not exist');
    }
    return post;
    } catch (error) {
    return { message: error.message };
    }
    };
    
  module.exports = {
     createPost,
    verifyIfAllCategoriesExist,
    getAllPosts,
    getPostById,
    };