const { Op } = require('sequelize');

const { Category, BlogPost, User } = require('../models');

// const verifyIfAllCategoriesExist = async (categoryIds) => {
//   const allCategoriesExist = await Category.findAll({
//  where: { id: categoryIds },
//  });
//  const reqCategories = categoryIds.length;
//  const foundCategories = allCategoriesExist.length;
//  const categoriesNotFound = foundCategories !== reqCategories;
//  console.log(categoriesNotFound);
//   console.log(reqCategories);
//   console.log(foundCategories);
//  if (categoriesNotFound) {
//  const newError = new Error('one or more "categoryIds" not found');
//  newError.status = 400;
//  throw newError;
//  }
//  };

//  const addCategorie = async (newBlogPost, categoryIds) => {
//    await newBlogPost.addCategories(categoryIds);
// };

// const createPost = async (userId, title, content, categoryIds) => {
//   console.log(userId);
//  await verifyIfAllCategoriesExist(categoryIds);
//  const newBlogPost = await BlogPost.create(userId, title, content);
//  await addCategorie(newBlogPost, categoryIds);
//  return newBlogPost;
//  };

const verifyIfAllCategoriesExist = async (categoryIds) => {
  const allCategoriesExist = await Category.findAll({

    where: { id: categoryIds },
    });
  const reqCategories = categoryIds.length;
  const foundCategories = allCategoriesExist.length;
  // const CategoriesNotFound = reqCategories !== foundCategories;
   if (reqCategories !== foundCategories) {
  const newError = new Error('one or more "categoryIds" not found');
  newError.status = 400;
  throw newError;
  }
  };
  
  const addCategory = async (newBlogPost, categoryIds) => {
    await newBlogPost.addCategories(categoryIds);
    };

  const createPost = async (title, content, categoryIds, userId) => {
      if (!userId) {
        throw new Error('userId is required');
    }
  await verifyIfAllCategoriesExist(categoryIds);
  const newBlogPost = await BlogPost.create({ title, content, userId });
  await addCategory(newBlogPost, categoryIds);
  console.log(newBlogPost);
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

const updatePost = async (id, title, content, userId) => {
const post = await getPostById(id);
if (post.user.id !== userId) {
    const newError = new Error('Unauthorized user');
    newError.status = 401;
    throw newError;
}
await BlogPost.update({ title, content }, { where: { id } });
return getPostById(id);
};

const deletePost = async (id, userId) => {
    const post = await BlogPost.findOne({
        where: { id },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            
        ],
    });
    if (!post) {
        const newError = new Error('Post does not exist');
        newError.status = 404;
        throw newError;
    }
    if (post.user.id !== userId) {
        const newError = new Error('Unauthorized user');
        newError.status = 401;
        throw newError;
    }
    await BlogPost.destroy({ where: { id } });
    return { message: 'Post deleted successfully' };
};

const search = async (query) => {
  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

  module.exports = {
     createPost,
    verifyIfAllCategoriesExist,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    search,
    };