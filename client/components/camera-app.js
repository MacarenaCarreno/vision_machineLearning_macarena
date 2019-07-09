import React from 'react'
import ReactDOM from 'react-dom'

import * as cocoSsd from '@tensorflow-models/coco-ssd'
import '@tensorflow/tfjs'

class CameraApp extends React.Component {
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
      ctx.strokeStyle = '#00FFFF'
      ctx.lineWidth = 4
      ctx.strokeRect(x, y, width, height)
      // Draw the label background.
      ctx.fillStyle = '#00FFFF'
      const textWidth = ctx.measureText(prediction.class).width
      const textHeight = parseInt(font, 10) // base 10
      ctx.fillRect(x, y, textWidth + 4, textHeight + 4)
    })

    predictions.forEach(prediction => {
      const x = prediction.bbox[0]
      const y = prediction.bbox[1]
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = '#000000'
      ctx.fillText(prediction.class, x, y)
    })
  }

  render() {
    let checkVideo = document.getElementsByTagName('video')
    console.log(checkVideo)

    console.log(checkVideo[0])

    return (
      <div className="center-align">
        <div className="container">
          <div className="row">
            <p>
              <button
                type="button"
                // onClick={this.handleClick}
                className="waves-effect waves-light btn "
              >
                Save Data
              </button>
            </p>
            <br />
          </div>

          <div className="container-video center">

              <div>
                <h5>The model is loading...</h5>
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

export default CameraApp
