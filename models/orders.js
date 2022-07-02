const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Orders = sequelize.define('orders', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  subscription:Sequelize.STRING,
  paymentid:Sequelize.STRING,
  premium:{
    type:Sequelize.BOOLEAN,
    defaultValue:false
  }
});

module.exports = Orders;
