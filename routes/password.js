const express = require('express');
const signUser = require('../controllers/sign');

const router = express.Router();

router.post('/password/forgotpassword',signUser.getResetMail)

router.get('/password/resetpassword/:uuid',signUser.setPassword)

router.post('/password/resetpassword/:uuid',signUser.updatePassword)

module.exports = router;
