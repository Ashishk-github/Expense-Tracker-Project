const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  amount:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  description: Sequelize.STRING,
  category:Sequelize.STRING,
  total:{
    type:Sequelize.INTEGER,
    defaultValue:0
  }
});

module.exports = Expense;