const Sequelize = require('sequelize')
const db = require('../db')

const Prediction = db.define('prediction', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },

})

module.exports = Prediction
