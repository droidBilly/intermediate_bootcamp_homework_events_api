const Sequelize = require('sequelize')
const sequelize = require('../db')

const Events = sequelize.define('events', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  tableName: 'events',
  timestamps: false
})

module.exports = Events
