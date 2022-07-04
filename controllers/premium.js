const Expense = require('../models/expenses');
const User = require('../models/user');
const Downloads=require('../models/downloads')
const uploadExpenseToBucket=require('../services/premiumfeatures')

exports.getPremium=async (req,res,next)=>{
    try{
        const user=await User.findByPk(req.user.id);
        const users=await User.findAll();
        if(user.premium){
            res.json({backgroundColor:"black",users:users});
        }else{
            res.json();
        }
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

exports.getExp=async (req,res,next)=>{
    try{
        const expenses=await Expense.findAll({where:{userId:req.body.id}});
        const user=await User.findByPk(req.user.id);
        if(user.premium){
            res.json({expenses});
        }else{
            res.json();
        }
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

exports.downloadExpense=async (req,res)=>{
    try{
        const user=await User.findByPk(req.user.id);
        if(!user.premium) return res.sendStatus(404)
        const expenses=await Expense.findAll({where:{userId:req.user.id}});
        // console.log(expenses);
        const stringifiedData=JSON.stringify(expenses);
        const filename=`Expense-${req.user.id}-${new Date()}.txt`;
        const fileURL=await uploadExpenseToBucket(stringifiedData,filename);
        console.log(fileURL);
        await req.user.createDownloads({fileURL})
        res.json({fileURL,success:true});
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

exports.downloadedFiles=async (req,res)=>{
    try{
        const user=await User.findByPk(req.user.id);
        if(!user.premium) return res.sendStatus(404)
        const files=await Downloads.findAll({where:{userId:req.user.id}});
        res.json(files);
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}