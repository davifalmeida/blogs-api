const express = require('express');
const { controllerUser } = require('../controllers');
const { userMiddleware } = require('../middlewares');

const router = express.Router();

router.post('/', userMiddleware.validateUser, controllerUser.registerUser);

module.exports = router;