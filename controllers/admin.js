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
        .then(res.send(`<script>alert('Registration Successfull')</script>`));
      })
    }else{ 
      res.send(`<script>alert('User Exists'); window.location.href="/page_location"</script>`)
    }
})
//   User.findAll({where:{id:1}}).then(hash=>{

//     console.log(hash[0].password)
//   bcrypt.compare('ashish777',hash[0].password,function(err,result){
    
//     if(result){
//       console.log(1);
//     }else{
//       console.log(0);
//     }
//   })
// })
  
};
