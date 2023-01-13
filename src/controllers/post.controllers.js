// const { postMiddleware } = require('../middlewares');
const { postService } = require('../services');

const create = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { id: userId } = req.user;
    const newPost = await postService.createPost(
      title,
      content,
      categoryIds,
      userId,
    );
    return res.status(201).json(newPost);
  };

    const getAll = async (_req, res) => {
        const posts = await postService.getAllPosts();
        if (posts.message) return res.status(404).json(posts);
        return res.status(200).json(posts);
    };
module.exports = {
    create,
    getAll,
};
