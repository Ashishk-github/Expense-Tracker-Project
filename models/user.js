const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  phno:Sequelize.STRING,
  password:Sequelize.STRING,
  totalexp:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  premium:{
    type:Sequelize.BOOLEAN,
    defaultValue:false
  }
});

module.exports = User;
