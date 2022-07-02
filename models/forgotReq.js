const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('forgotrequests', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true
  },
  isActive: Sequelize.BOOLEAN

});

module.exports = User;
