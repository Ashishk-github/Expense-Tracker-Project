const path = require('path');

const express = require('express');
const app = express();
const dotenv=require('dotenv');
dotenv.config();
const bodyParser = require('body-parser');
const cors=require('cors');
const sequelize = require('./util/database');
const User = require('./models/user');

app.use(cors())

const adminRoutes = require('./routes/admin');

app.use(bodyParser.json());

app.use(adminRoutes);
sequelize
  // .sync({ force: true })
  .sync()
 .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
