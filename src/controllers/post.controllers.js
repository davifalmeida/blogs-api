const { postService } = require('../services');

const create = async (req, res, next) => {
    try {
      const { title, content, categoryIds } = req.body;
      const { userId } = req.user;
      const post = await postService.createPost(title, content, categoryIds, userId);
      res.status(201).json(post);
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

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const { userId } = req.user;
      const updatedPost = await postService.updatePost(id, title, content, userId);
        return res.status(200).json(updatedPost);
    } catch (error) {
        if (error.message === 'Post does not exist') {
            res.status(404).json({ message: error.message });
        } else if (error.message === 'Unauthorized user') {
            res.status(401).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        await postService.deletePost(id, userId);
        return res.status(204).end();   
    } catch (error) {
        if (error.message === 'Post does not exist') {
            res.status(404).json({ message: error.message });
        } else if (error.message === 'Unauthorized user') {
            res.status(401).json({ message: error.message });
        } else {
            next(error);
        }
    }
};

const searchPost = async (req, res) => {
    const { q: query } = req.query;
    const posts = await postService.search(query);
    return res.status(200).json(posts);
  };

module.exports = {
    create,
    getAll,
    getPostById,
    update,
    deletePost,
    searchPost,
};
