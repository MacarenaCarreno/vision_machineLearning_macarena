import React from 'react'

export const PredictionDetails = props => {
  // const {class, score} = props.predictionsdet

  console.log('DETAILS', props)
  return (
    <ul>
      {props.predictiondetails.map(det => (
        <div key={det.id}>
          <li>
            {det.class} - {det.score.toFixed(2) * 100}%
          </li>
        </div>
      ))}
    </ul>
  )
}
