const express = require('express');

const loginRouter = require('./login.router');

const router = express.Router();

router.use('/login', loginRouter);

module.exports = router;