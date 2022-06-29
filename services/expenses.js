const path = require('path');
const Expense = require('../models/expenses');
const User = require('../models/user');
exports.addExp=(req,res)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    console.log(2);
    Expense.create({
        amount:amount,
        description:description,
        category:category,
        userId:req.user.id
    })
    .then(res1=>res.json(res1));
}
exports.getExp=(req,res)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    Expense.findAll({where:{userId:req.user.id}})
    .then(res1=>res.json(res1));
}