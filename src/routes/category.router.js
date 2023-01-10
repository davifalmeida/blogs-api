const express = require('express');

const router = express.Router();

const { categoryController } = require('../controllers');
const { categoryMiddleware } = require('../middlewares');
const { loginMiddleware } = require('../middlewares');

router.post('/',
categoryMiddleware.validateName,
 loginMiddleware.validateTokenLogin,
  categoryController.createCategories);

module.exports = router;