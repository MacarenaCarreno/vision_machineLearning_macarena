import React from 'react'
import {connect} from 'react-redux'

import {getPredictions} from '../store/predictions'

class Predictions extends React.Component {
  componentDidMount() {
    this.props.getPredictions()
  }

  render() {
    console.log(this.props)
    return <div>This are the Predictions!! </div>
  }
}

const mapStateToProps = state => ({
  predictions: state.predictions
})

const mapDispatch = dispatch => ({
  getPredictions: () => dispatch(getPredictions())
})

export default connect(mapStateToProps, mapDispatch)(Predictions)
