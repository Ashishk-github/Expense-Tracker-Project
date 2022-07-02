const Expense = require('../models/expenses');
const Orders = require('../models/orders');
const User = require('../models/user');

exports.getPremium=async (req,res,next)=>{
    const user=await User.findByPk(req.user.id);
    const users=await User.findAll();
    if(user.premium){
        res.json({backgroundColor:"black",users:users});
    }else{
        res.json();
    }
}