const express = require('express');
const signUser = require('../controllers/sign');
const router = express.Router();

router.post('/createuser',signUser.postUser);

router.post('/login',signUser.login);

module.exports = router;
