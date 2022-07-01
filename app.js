const path = require('path');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors=require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');
const Expense = require('./models/expenses');
app.use(cors())

const adminRoutes = require('./routes/admin');

app.use(bodyParser.json());

app.use(adminRoutes);
app.use((req,res)=>{
  res.sendFile(path.join(__dirname,`frontend/${req.url}`));
})
User.hasMany(Expense);
Expense.belongsTo(User);
sequelize
  // .sync({ force: true })
  .sync()
 .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
