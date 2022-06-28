const Sequelize = require('sequelize');
// const dotenv=require('dotenv');
// dotenv.config();
// console.log(process.env.DB_password)
const sequelize = new Sequelize(process.env.DB_name, process.env.DB_username,process.env.DB_password , {
  dialect: 'mysql',
  host: process.env.DB_host
});

module.exports = sequelize;
