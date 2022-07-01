const path = require('path');
const jwt = require('jsonwebtoken');

const express = require('express');

const adminController = require('../controllers/admin');
const premiumSub=require('../services/premium');
const expenseSevice =require('../services/expenses');

function auth(req,res,next){
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log('error:',err)
    console.log(user,1);
    if (err) return res.sendStatus(403)
    console.log(3)
    req.user = user;

    next()
  })
}
const router = express.Router();

router.post('/createuser',adminController.postUser);

router.post('/login',adminController.login);

router.post('/addexpense',auth,expenseSevice.addExp)
router.get('/addexpense',auth,expenseSevice.getExp)
router.post('/createorder',premiumSub.createOrder)
router.post('/verifyorder',premiumSub.verifyOrder)

module.exports = router;
