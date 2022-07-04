const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
    console.log(token);
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.log('error:',err)
    console.log(user,1);
    if (err) return res.sendStatus(403)
    console.log(3)
    req.user = user;

    next()
  })
}