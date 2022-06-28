const bcrypt=require('bcrypt');
const User = require('../models/user');
exports.getUsers = (req, res, next) => {
  res.json()
};

exports.postUser = (req, res, next) => {
  // console.log(req.body);
  
  const name = req.body.name;
  const email = req.body.email;
  const phno = req.body.phno;
  const pass = req.body.password;
  let userExists=false;
  User.findAll()
  .then(users=>{
    for(x of users){
      userExists=(x.email===email || x.phno===phno);
    }
    if (!userExists){
        bcrypt.hash(pass,10,function(err,hash){
        const password=hash
        User.create({name,email,phno,password})
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
  User.findAll({where:{email:email}}).then(([hash])=>{
        console.log(hash.email);
        console.log(hash.password);
      bcrypt.compare(password,hash.password,function(err,result){
        console.log(result)
        res.json({success:result});
      })
    })
      
}
