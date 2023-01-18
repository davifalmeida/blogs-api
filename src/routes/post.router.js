const express = require('express');

const router = express.Router();

const { postController } = require('../controllers');
const { postMiddleware } = require('../middlewares');
const { loginMiddleware } = require('../middlewares');

router.get('/', loginMiddleware.validateTokenLogin, postController.getAll);
router.get('/:id', loginMiddleware.validateTokenLogin, postController.getPostById);

router.post('/', loginMiddleware.validateTokenLogin,
    postMiddleware.checkValidBlogPost,
  postController.create);

router.put('/:id', loginMiddleware.validateTokenLogin,
    postMiddleware.validatePostUpdate,
 postController.update);

router.delete('/:id', loginMiddleware.validateTokenLogin, postController.deletePost);
module.exports = router;