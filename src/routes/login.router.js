const express = require('express');

const router = express.Router();

const controllerLogin = require('../controllers/login.controllers');

router.post('/', controllerLogin);

module.exports = router;