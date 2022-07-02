const path = require('path');
const Expense = require('../models/expenses');
const User = require('../models/user');
exports.addExp=async (req,res)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    const user=await User.findByPk(req.user.id);
    const totalexp=user.totalexp+amount;
    user.update({totalexp:totalexp});
    console.log(2);
    const res1=await Expense.create({
        amount:amount,
        description:description,
        category:category,
        totalexp:totalexp,
        userId:req.user.id
    })
    res.json(res1);
}
exports.getExp=(req,res)=>{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    Expense.findAll({where:{userId:req.user.id}})
    .then(res1=>res.json(res1));
}
