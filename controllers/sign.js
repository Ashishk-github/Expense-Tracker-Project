const bcrypt=require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const uuid=require('uuid');
const Req = require('../models/forgotReq');
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

exports.postUser = async (req, res, next) => {
  // console.log(req.body);
  try{
    const name = req.body.name;
  const email = req.body.email;
  const phno = req.body.phno;
  const pass = req.body.password;
  const totalexp=0;
  let userExists=false;
  const users=await User.findAll()
    for(x of users){
      if(x.email===email || x.phno===phno){
        userExists=true;
        break;
      } 
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
}
catch(error){
    console.log(error);
    res.sendStatus(500);
}
  
};

exports.login=async (req,res,next)=>{
  try{
  const email=req.body.email;
  const password=req.body.password;
  const hash=await User.findAll({where:{email:email}})
        // console.log(hash.email);
        // console.log(hash.password);
      if(hash.length===0) return res.sendStatus(404);
      bcrypt.compare(password,hash[0].password,function(err,result){
        if (result){
            const token=generateAccessToken({id:hash[0].id});
            res.json(token);  
        }else res.sendStatus(401)
      })
  }catch(error){
    console.log(error);
    res.sendStatus(500);
}
      
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
  catch(error){
    console.log(error);
    res.sendStatus(500);
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
      `<form method="POST">
      <label>NEW PASSWORD</label><br>
<input type="text" name="password" id="password"><br>
<input type="submit" value="SET">
    </form>`)
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
}
}
exports.updatePassword=async (req,res)=>{
  try{
    console.log(req.body)
    const password=req.body.password;
    const uuid=req.params.uuid;
    console.log(password,uuid);
    bcrypt.hash(password,10,async function(err,hash){
      const request=await Req.findByPk(uuid);
      // console.log(request);
      const userId=request.userId;
      await request.update({isActive:false});
      await request.save();
      const user=await User.findByPk(userId);
      await user.update({password:hash});
      await user.save();
      res.redirect('/login.html');
    })
  }
  catch(error){
    console.log(error);
    res.sendStatus(500);
}
}