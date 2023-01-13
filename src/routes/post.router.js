const express = require('express');

const router = express.Router();

const { postController } = require('../controllers');
const { postMiddleware } = require('../middlewares');
const { loginMiddleware } = require('../middlewares');

router.post('/', loginMiddleware.validateTokenLogin,
    postMiddleware.checkValidBlogPost,
  postController.create);

router.get('/', loginMiddleware.validateTokenLogin, postController.getAll);

module.exports = router;