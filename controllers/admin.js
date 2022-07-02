const bcrypt=require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}
exports.getUsers = (req, res, next) => {
  res.json()
};

exports.postUser = (req, res, next) => {
  // console.log(req.body);
  
  const name = req.body.name;
  const email = req.body.email;
  const phno = req.body.phno;
  const pass = req.body.password;
  const totalexp=0;
  let userExists=false;
  User.findAll()
  .then(users=>{
    for(x of users){
      userExists=(x.email===email || x.phno===phno);
    }
    if (!userExists){
        bcrypt.hash(pass,10,function(err,hash){
        const password=hash
        User.create({name,email,phno,password,totalexp})
        .then(res.send('Registration Successfull'))
      })
    }else{ 
      res.send('User Exists,Please Login')
    }
})
};

exports.login=(req,res,next)=>{
  const email=req.body.email;
  const password=req.body.password;
  User.findAll({where:{email:email}}).then((hash)=>{
        // console.log(hash.email);
        // console.log(hash.password);
      if(hash.length===0) return res.sendStatus(404);
      bcrypt.compare(password,hash[0].password,function(err,result){
        if (result){
            const token=generateAccessToken({id:hash[0].id});
            res.json(token);  
        }else res.sendStatus(401)
      })
    })
      
}

exports.setPassword=(req,res,next)=>{
  email=req.body.email;
  res.json({success:true});
}