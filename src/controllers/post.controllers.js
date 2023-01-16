// const { postMiddleware } = require('../middlewares');
const { postService } = require('../services');

const create = async (req, res, next) => {
    try {
      const { title, content, categoryIds, userId } = req.body;
      const post = await postService.createPost({ title, content, categoryIds, userId });
      res.status(201).json({ post });
    } catch (error) {
        if (error.message === 'one or more "categoryIds" not found') {
          res.status(400).json({ message: error.message });
        } else {
          next(error);
        }
      }
    };

    const getAll = async (_req, res) => {
        const posts = await postService.getAllPosts();
        if (posts.message) return res.status(404).json(posts);
        return res.status(200).json(posts);
    };

const getPostById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const post = await postService.getPostById(id);
        if (post.message) return res.status(404).json(post);
        return res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    getAll,
    getPostById,
};
