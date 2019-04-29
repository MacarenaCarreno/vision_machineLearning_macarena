import React from 'react'
import '@tensorflow/tfjs'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
import {connect} from 'react-redux'

import {precision} from '@tensorflow/tfjs-layers/dist/exports_metrics'

import {addPredictions} from '../store/predictions'

class CameraApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      model: null,
      stream: null,
      videoElement: null,
      canvasElement: null,
      prediction: [],
      myprediction: {}
    }
    this.handleClick = this.handleClick.bind(this)
  }

  async componentDidMount() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {facingMode: 'environment'},
        audio: false
      })
      const model = await cocoSsd.load()
      await this.setState({
        videoElement: this.refs.video,
        canvasElement: this.refs.canvas,
        stream,
        model
      })
      this.state.videoElement.srcObject = this.state.stream
      this.predictFrame()
    } catch (err) {
      console.log(err)
    }
  }

  predictFrame = async () => {
    const predictions = await this.state.model.detect(this.refs.video)
    this.drawPredictions(predictions)
    this.predictFrame()
  }

  drawPredictions = predictions => {
    const frame = this.state.canvasElement.getContext('2d')
    frame.clearRect(0, 0, frame.canvas.width, frame.canvas.height)
    const font = '16px sans-serif'
    frame.font = font
    frame.textBaseline = 'top'

    predictions.forEach(prediction => {
      const x = prediction.bbox[0]
      const y = prediction.bbox[1]
      const width = prediction.bbox[2]
      const height = prediction.bbox[3]
      // Draw prediction box.
      frame.strokeStyle = '#e57373'
      frame.lineWidth = 4
      frame.strokeRect(x, y, width, height)
      // Draw text box.
      frame.fillStyle = '#b2dfdb'
      const textWidth = frame.measureText(prediction.class).width
      const textHeight = parseInt(font, 10) // base 10
      const probability = Math.round(prediction.score * 1000) / 1000 * 100
      const scoreWidth = frame.measureText(probability).width
      frame.fillRect(x, y, textWidth + scoreWidth + 20, textHeight + 4)
      // Draw text.
      frame.fillStyle = '#000000'
      frame.fillText(prediction.class + ' ' + probability + '%', x, y)
    })
  }

  handleClick = async () => {
    let newState = {...this.state}
    newState.prediction = await this.state.model.detect(this.refs.video)

    let myprediction = {
      title: 'testpred',
      predictionDetail: []
    }

    const preddet = newState.prediction.map(pred => {
      return {
        class: pred.class,
        score: pred.score
      }
    })
    myprediction.predictionDetail = preddet
    newState.myprediction = myprediction
    this.setState(newState)
    this.props.addPredictions(myprediction)
  }

  render() {
    console.log(this.state.prediction)
    return (
      <div className="center-align">
        <div className="container">
          <div className="row">
            <p>
              <button
                type="button"
                onClick={this.handleClick}
                className="waves-effect waves-light btn "
              >
                Save Data
              </button>
            </p>
            <p />
          </div>

          <div className="row center-aligne">
            <video
              id="videoElement"
              className="position"
              autoPlay={true}
              playsInline
              muted
              ref="video"
              width="600"
              height="600"
            />
            <canvas
              className="position"
              ref="canvas"
              width="600"
              height="500"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  prediction: state.myprediction
})

const mapDispatch = dispatch => ({
  addPredictions: prediction => dispatch(addPredictions(prediction))
})

export default connect(mapStateToProps, mapDispatch)(CameraApp)
