const userMiddleware = require('./user.middlewares');
const loginMiddleware = require('./login.mddlewares');
const categoryMiddleware = require('./category.middlewares');
const postMiddleware = require('./post.middlewares');

module.exports = {
    userMiddleware,
    loginMiddleware,
    categoryMiddleware,
    postMiddleware,
};