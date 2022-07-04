const path = require('path');
const Expense = require('../models/expenses');
const User = require('../models/user');
exports.addExp=async (req,res)=>{
try{
    const amount=req.body.amount;
    const description=req.body.description;
    const category=req.body.category;
    const user=await User.findByPk(req.user.id);
    const totalexp=parseInt(user.totalexp)+parseInt(amount);
    console.log(totalexp,user.totalexp,amount)
    await user.update({totalexp:totalexp});
    await user.save();
    const res1=await Expense.create({
        amount:amount,
        description:description,
        category:category,
        total:totalexp,
        userId:req.user.id
    })
    res.json(res1);
}catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

exports.getExp=async (req,res)=>{
try{
    const res1=await Expense.findAll({where:{userId:req.user.id}})
    res.json(res1);
}catch(error){
    console.log(error);
    res.sendStatus(500);
}
}
