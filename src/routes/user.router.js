const express = require('express');
const { controllerUser } = require('../controllers');
const { userMiddleware } = require('../middlewares');
const { loginMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', userMiddleware.validateUser, controllerUser.registerUser);
router.get('/', loginMiddleware.validateTokenLogin, controllerUser.getAllUsers);

module.exports = router;