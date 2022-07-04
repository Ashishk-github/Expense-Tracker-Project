const express = require('express');
const auth=require('../controllers/authenticator');
const premiumSub=require('../services/premium');
const expenseController =require('../controllers/user');
const premium=require('../controllers/premium');

const router = express.Router();

router.post('/addexpense',auth,expenseController.addExp)

router.get('/addexpense',auth,expenseController.getExp)

router.post('/createorder',auth,premiumSub.createOrder)

router.post('/verifyorder',auth,premiumSub.verifyOrder)

router.get('/getpremium',auth,premium.getPremium)

router.post('/getpremiumexpense',auth,premium.getExp)

router.get('/download',auth,premium.downloadExpense);

router.get('/previous-downloads',auth,premium.downloadedFiles);

module.exports = router;
