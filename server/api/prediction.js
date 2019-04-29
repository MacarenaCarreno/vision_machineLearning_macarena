const router = require('express').Router()
const {Prediction, PredictionDetail} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const prediction = await Prediction.findAll({
      include: [{model: PredictionDetail}]
    })
    res.json(prediction)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const prediction = await Prediction.create({
      title: req.body.title
    })
    const addPredictionDetail = await PredictionDetail.create({
      class: req.body.class,
      score: req.body.score,
      predictionId: prediction.id
    })
    res.status(201).json(addPredictionDetail)
  } catch (err) {
    next(err)
  }
})
