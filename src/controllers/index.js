const express = require('express');
const home = require('./home');
const login = require('./login');

const router = express.Router();

router.get('/', home.get);
router.get('/admin/login', login.get);

module.exports = router;
