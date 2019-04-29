const Sequelize = require('sequelize')
const db = require('../db')

const PredictionDetail = db.define('predictiondetail', {
  class: {
    type: Sequelize.STRING,
    allowNull: false
  },
  score: {
    type: Sequelize.FLOAT
  }
})

module.exports = PredictionDetail
