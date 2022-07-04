const Razorpay = require('razorpay');
const Orders = require('../models/orders');
const User = require('../models/user');
const crypto=require('crypto');
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
                const id=order.id
                const subscription='premium'
                Orders.create({
                    id:id,
                    subscription:subscription,
                    userId:req.user.id
                })
                res.json(order);
            }
            else {
                // console.log(1);
                res.send(err);}
        })
}
exports.verifyOrder=async (req,res,next)=>{
    try{
        const {order_id,payment_id}=req.body;
        const razorpay_signature=req.headers['x-razorpay-signature'];
        console.log(order_id,payment_id)
        let hmac=crypto.createHmac('sha256',process.env.KEY_SECRET);
        hmac.update(order_id+"|"+payment_id);
        const generated_signature=hmac.digest('hex');
        console.log(generated_signature)
        console.log(razorpay_signature);
        if(razorpay_signature===generated_signature){
            const user=await User.findByPk(req.user.id)
            await user.update({premium:true});
            await user.save();
            const order=await Orders.findByPk(order_id);
            await order.update({premium:true});
            await order.save();
            res.json({success:true,message:"Payment successfull"});
    
        }else{
            res.json({success:false,message:"Payment verification failed"});
        }
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
    
}
