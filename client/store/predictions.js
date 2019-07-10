import axios from 'axios'
import history from '../history'

//ACTION TYPES
const LOADING = 'LOADING'
const FETCH_PREDICTIONS = 'FETCH_PREDICTIONS'
const ADD_PREDICTION = 'ADD_PREDICTION'

//ACTION CREATOR
const loading = () => ({
  type: LOADING,
  loading: true
})

const fetchPredictions = predictions => ({
  type: FETCH_PREDICTIONS,
  predictions
})

const addPrediction = newPredictions => ({
  type: ADD_PREDICTION,
  newPredictions
})

//THUNKS

export const getPredictions = () => async dispatch => {
  try {
    dispatch(loading)
    const {data} = await axios.get(`/api/prediction/`)
    dispatch(fetchPredictions(data))
  } catch (err) {
    console.error(err)
  }
}

export const addPredictions = newPredictions => async dispatch => {
  try {
    const {data} = await axios.post(`/api/prediction/`, newPredictions)

    dispatch(addPrediction(data))
  } catch (err) {
    console.error(err)
  }
}

let initialState = {
  predictions: [],
  loading: true
}

//REDUCER
export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {...state, loading: true}
    case FETCH_PREDICTIONS:
      return {...state, predictions: action.predictions, loading: false}
    case ADD_PREDICTION:
      return {
        ...state,
        predictions: [...state.predictions, action.newPredictions]
      }
    default:
      return state
  }
}
