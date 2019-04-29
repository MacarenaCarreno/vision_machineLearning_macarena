import React from 'react'
import {connect} from 'react-redux'

import {getPredictions} from '../store/predictions'
import {PredictionDetails} from './predictionsdetails'

class Predictions extends React.Component {
  componentDidMount() {
    this.props.getPredictions()
  }

  render() {
    const {predictions} = this.props.predictions
    console.log(predictions)
    return (
      <div>
        <h4>Predictions </h4>
        <table className="highlight">
          <thead>
            <tr>
              <th>id </th>
              <th>Name </th>
              <th>Inventory %Prediction</th>
            </tr>
          </thead>

          <tbody>
            {predictions.map(prediction => (
              <tr key={prediction.id}>
                <td>{prediction.id}</td>
                <td>{prediction.title}</td>
                <td>
                  <ul>
                    <PredictionDetails
                      predictiondetails={prediction.predictiondetails}
                      key={prediction.predictiondetails.id}
                    />
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  predictions: state.predictions
})

const mapDispatch = dispatch => ({
  getPredictions: () => dispatch(getPredictions())
})

export default connect(mapStateToProps, mapDispatch)(Predictions)
