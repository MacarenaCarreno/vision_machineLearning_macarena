import React from 'react'
import {logos, machineLearning} from '../../script/logos.js'

const About = () => {
  return (
    <div className="container">
      {' '}
      <h4 className="grey-text">Vision Machine Learning Image Recognition </h4>
      <h6 className="grey-text">
        A 3 days solo project for Stackathon at GraceHopper - FullStack code
        Academy{' '}
      </h6>
      <br />
      <div className="row">
        <h4 className="grey-text">STACK </h4>
        <div className="row center-align">
          <h5>Back end and Front End</h5>
          <hr />

          {logos.map(el => (
            <div className="col s12 m6 l4 xl4" key={el.id}>
              <div className="promo promo-example">
                <img
                  className="center"
                  data-caption={el.name}
                  height="100px"
                  src={el.img}
                />
                <div className="center promo promo-example">
                  <p className="promo-caption">{el.name}</p>
                  <p className="light center"> {el.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row center-align">
          <h5>Machine Learning Tools</h5>
          <hr />

          {machineLearning.map(el => (
            <div className="col s12 m6 l6 xl6" key={el.id}>
              <div className="promo promo-example">
                <img
                  className="center"
                  data-caption={el.name}
                  height="100px"
                  src={el.img}
                />
                <div className="center promo promo-example">
                  <a href={el.link}>
                    <p className="promo-caption">{el.name}</p>
                  </a>
                  <p className="light center"> {el.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
