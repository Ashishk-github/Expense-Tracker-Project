const path = require('path');
const express = require('express');
const app = express();
const dotenv=require('dotenv');
const fs=require('fs');
// const helmet=require('helmet');
const morgan=require('morgan');
dotenv.config();
const bodyParser = require('body-parser');
const cors=require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expenses');
const Orders = require('./models/orders');
const Req = require('./models/forgotReq');
const Downloads = require('./models/downloads');
const accessLog=fs.createWriteStream(
  path.join(__dirname,'access.log'),
  {flags:'a'}
)
app.use(cors())

const signRoutes = require('./routes/sign');
const passwordRoutes = require('./routes/password');
const userRoutes = require('./routes/user');
// app.use(helmet());
app.use(morgan('combined',{stream: accessLog}))
app.use(bodyParser.urlencoded({limit:'5000mb',extended:true,parameterLimit:10000000000}));
app.use(bodyParser.json());

app.use(signRoutes);
app.use(passwordRoutes);
app.use(userRoutes);
app.use((req,res)=>{
  res.sendFile(path.join(__dirname,`frontend/${req.url}`));
})

User.hasMany(Expense,{onDelete:'CASCADE'});
Expense.belongsTo(User);
User.hasMany(Orders,{onDelete:'CASCADE'});
User.hasMany(Req,{onDelete:'CASCADE'})
User.hasMany(Downloads,{onDelete:'CASCADE'})
sequelize
  // .sync({ force: true })
  .sync()
 .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
