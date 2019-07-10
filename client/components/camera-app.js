import React from 'react'

import {connect} from 'react-redux'
import {addPredictions} from '../store/predictions'

import * as cocoSsd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs'

class CameraApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  videoRef = React.createRef()
  canvasRef = React.createRef()

  componentDidMount() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const webCamPromise = navigator.mediaDevices

        .getUserMedia({
          audio: false,
          video: {
            facingMode: 'user'
          }
        })
        .then(stream => {
          window.stream = stream
          this.videoRef.current.srcObject = stream
          return new Promise((resolve, reject) => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve()
            }
          })
        })
      const modelPromise = cocoSsd.load()
      Promise.all([modelPromise, webCamPromise])
        .then(values => {
          this.detectFrame(this.videoRef.current, values[0])

          this.setState({model: values[0]})
        })
        .catch(error => {
          console.error(error)
        })
    }
  }

  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      this.renderPredictions(predictions)
      requestAnimationFrame(() => {
        this.detectFrame(video, model)
      })
    })
  }

  renderPredictions = predictions => {
    const ctx = this.canvasRef.current.getContext('2d')
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    // Font options.
    const font = '16px sans-serif'
    ctx.font = font
    ctx.textBaseline = 'top'

    predictions.forEach(prediction => {
      const x = prediction.bbox[0]
      const y = prediction.bbox[1]
      const width = prediction.bbox[2]
      const height = prediction.bbox[3] - 100
      // Draw the bounding box.
      ctx.strokeStyle = '#fafafa'
      ctx.lineWidth = 4
      ctx.strokeRect(x, y, width, height)
      // Draw the label background.
      ctx.fillStyle = '#fafafa'
      const textWidth = ctx.measureText(prediction.class).width
      const scoreWidth = ctx.measureText(prediction.score).width
      const textHeight = parseInt(font, 10) // base 10
      ctx.fillRect(x, y, textWidth + scoreWidth + 4, textHeight + 4)
    })

    predictions.forEach(prediction => {
      const x = prediction.bbox[0]
      const y = prediction.bbox[1]
      // Draw the text last to ensure it's on top.
      const score = Math.round(prediction.score * 1000) / 1000 * 100
      ctx.fillStyle = '#000000'
      ctx.fillText(prediction.class + ' ' + score + '%', x, y)
    })
  }

  handleClick = async () => {
    const model = this.state.model
    const video = this.videoRef.current

    const savePred = (video2, model2) => {
      model2.detect(video2).then(predictions => {
        const predDetails = predictions.map(pred => {
          return {
            class: pred.class,
            score: pred.score
          }
        })
        this.props.addPredictions({
          title: 'test',
          predictionDetail: [predDetails[0]]
        })

        this.setState({
          class: predDetails[0].class,
          score: predDetails[0].score
        })
      })
    }
    savePred(video, model)
  }

  render() {
    const type = this.state.class

    const score = Math.round(this.state.score * 1000) / 1000 * 100

    console.log('State', this.state)
    console.log(type, score)

    return (
      <div className="center-align">
        {this.state.class ? (
          <div className="row">
            <h6 className="grey-text text-darken-1">
              <span className="grey-text text-darken-5">Last Save </span>
              Item {type} | Score {score}%
            </h6>
          </div>
        ) : (
          <div />
        )}

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

            <br />
          </div>

          {!this.state.model ? (
            <div>
              <h5 className="grey-text text-lighten-2">
                The model is loading...
              </h5>
              <div className="preloader-wrapper big active">
                <div className="spinner-layer spinner-blue-only">
                  <div className="circle-clipper left">
                    <div className="circle" />
                  </div>
                  <div className="gap-patch">
                    <div className="circle" />
                  </div>
                  <div className="circle-clipper right">
                    <div className="circle" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div />
          )}

          <div className="container-video center">
            <video
              className="position"
              autoPlay
              playsInline
              muted
              ref={this.videoRef}
              width="780"
              height="650"
            />
            <canvas
              className="position"
              ref={this.canvasRef}
              width="780"
              height="650"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    predictions: state
    //categories: state.closet.categories
  }
}

const mapDispatch = dispatch => ({
  addPredictions: prediction => dispatch(addPredictions(prediction))
})

export default connect(mapStateToProps, mapDispatch)(CameraApp)
