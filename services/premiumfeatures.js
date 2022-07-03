const Expense = require('../models/expenses');
const Orders = require('../models/orders');
const User = require('../models/user');
const expenseSevice =require('../services/expenses');
const AWS=require('aws-sdk');
async function uploadExpenseToBucket(data,filename){
    let s3bucket=new AWS.S3({
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_ACCESS_SECRET,
    })
    params={
        Bucket:process.env.BUCKET,
        Key:filename,
        Body:data,
        ACL:'public-read'
    }
    return new Promise((resolve,reject)=>{
        s3bucket.upload(params,(err,s3response)=>{
            if(err) reject(err);
            else resolve(s3response);
        })
    });
       

}

exports.getPremium=async (req,res,next)=>{
    const user=await User.findByPk(req.user.id);
    const users=await User.findAll();
    if(user.premium){
        res.json({backgroundColor:"black",users:users});
    }else{
        res.json();
    }
}

exports.getExp=async (req,res,next)=>{

    const expenses=await Expense.findAll({where:{userId:req.body.id}});
    const user=await User.findByPk(req.user.id);
    if(user.premium){
        res.json({expenses});
    }else{
        res.json();
    }
}

exports.downloadExpense=async (req,res)=>{
    try{
        const user=await User.findByPk(req.user.id);
        if(!user.premium) res.sendStatus(404).send('Please Buy Premium');
        const expenses=await Expense.findAll({where:{userId:req.user.id}});
        // console.log(expenses);
        const stringifiedData=JSON.stringify(expenses);
        const filename=`Expense-${req.user.id}-${new Date()}.txt`;
        const fileURL=await uploadExpenseToBucket(stringifiedData,filename);
        console.log(fileURL);
        res.json({fileURL,success:true});
    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}