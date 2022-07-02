const bcrypt=require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const uuid=require('uuid');
const Req = require('../models/forgotReq');
const { request } = require('express');
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

exports.getResetMail=async (req,res,next)=>{
  try{
    const email=req.body.email;
    const user=await User.findOne({where:{email:email}});
    const id=uuid.v1();
    if(!user) res.send("User Not Found!!!");
    await Req.create({
      id:id,
      isActive:true,
      userId:user.id
    })
    console.log(id);
    //send the following uuid number through mail
    res.send("Please follow the reset link sent to your email");
  }
  catch{
    console.error();
  }
}

exports.setPassword=async (req,res,next)=>{
  try{
    const uuid=req.params.uuid;
    const request=await Req.findByPk(uuid);
    if(!request) res.send('Not a Valid URL');
    // console.log(request)
    if(!request.isActive) res.send('Link has Expired');
    res.send(
      `<form action='/password/resetpassword/${uuid}' method='POST'>
      <label>NEW PASSWORD</label><br>
<input type="password" name="password"></input>
<input name="uuid" value="${uuid}"></input><br>
<button type="submit">SET</button>
    </form>`)
  }
  catch{
    console.error();
  }
}
exports.updatePassword=async (req,res)=>{
  try{
    console.log(req.body)
    const password=req.body.password;
    const uuid=req.body.uuid
    console.log(password,uuid);
    bcrypt.hash(password,10,async function(err,hash){
      const request=await Req.findByPk(uuid);
      console.log(request);
      const userId=request.userId;
      request.update({isActive:false});
      request.save();
      const user=await User.findByPk(userId);
      user.update({password:password});
      user.save();
      res.redirect('/login.html');
    })
  }
  catch{
    console.error();
  }
}