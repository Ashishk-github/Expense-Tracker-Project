const Expense = require('../models/expenses');
const Razorpay = require('razorpay');
const razorpayInstance= new Razorpay({
    key_id:process.env.KEY_ID,
    key_secret:process.env.KEY_SECRET
  })
exports.createOrder=(req,res,next)=>{
    const {amount,currency,receipt,notes}=req.body;
    // console.log({amount,currency,receipt,notes})
    razorpayInstance.orders.create({amount:amount,currency:currency,receipt:receipt,notes:notes},
        (err,order)=>{
            if(!err) {
                // console.log(order)
                
                res.json(order);
            }
            else {
                // console.log(1);
                res.send(err);}
        })
}
exports.verifyOrder=(req,res,next)=>{
    const {order_id,payment_id}=req.body;
    const razorpay_signature=req.headers['x-razorpay-signature'];
    let hmac=crypto.createHmac('sha256',process.env.KEY_SECRET);
    hmac.update(order_id+"|"+payment_id);
    const generated_signature=hmac.digest('hex');
    if(razorpay_signature===generated_signature){
        res.json({success:true,message:"Payment successfull"});
    }else{
        res.json({success:false,message:"Payment verification failed"});
    }
}