import React from 'react'
import {connect} from 'react-redux'

import {getPredictions} from '../store/predictions'
import {PredictionDetails} from './Predictionsdetails'

class Predictions extends React.Component {
  async componentDidMount() {
    await this.props.getPredictions()
  }

  formatDate(date) {
    let d = new Date(date)
    let curr_date = d.getDate()
    let curr_month = d.getMonth() + 1 //Months are zero based
    let curr_year = d.getFullYear()
    let hour = d.getHours()
    let min = d.getMinutes()

    let newDate =
      curr_month +
      '-' +
      curr_date +
      '-' +
      curr_year +
      ' ' +
      hour +
      ':' +
      min +
      ' hr'
    return newDate
  }

  render() {
    const {predictions} = this.props.predictions
    return (
      <div className="container">
        <h4 className="center">Predictions </h4>
        <table className="highlight">
          <thead>
            <tr>
              <th>id </th>
              <th>Date </th>
              <th>Item - %Prediction</th>
            </tr>
          </thead>

          <tbody>
            {predictions.map(prediction => (
              <tr key={prediction.id}>
                <td>{prediction.id}</td>

                <td> {this.formatDate(prediction.createdAt)}</td>

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

const fechingData = getPredictions(['FETCH_PREDICTIONS'])

const mapStateToProps = state => ({
  predictions: state.predictions
})

const mapDispatch = dispatch => ({
  getPredictions: () => dispatch(getPredictions())
})

export default connect(mapStateToProps, mapDispatch)(Predictions)
