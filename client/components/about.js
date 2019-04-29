import React from 'react'

const About = () => {
  return (
    <div>
      {' '}
      <h3>Project developed with </h3>
      <div className="row">
        <div className="col l4 m4 s4">
          <img
            className="materialboxed"
            data-caption="NodeJS"
            width="50%"
            src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png"
          />
        </div>

        <div className="col l4 m4 s4">
          <img
            className="materialboxed"
            data-caption="Postgres"
            width="50%"
            src="https://zdnet4.cbsistatic.com/hub/i/r/2018/04/19/092cbf81-acac-4f3a-91a1-5a26abc1721f/resize/370xauto/ce84e38cb1c1a7c5a2c9e4c337e108ba/postgresql-logo.png"
          />
        </div>

        <div className="col l4 m4 s4">
          {' '}
          <img
            className="materialboxed"
            data-caption="JavaScript"
            width="40%"
            src="https://www.w3schools.com/whatis/img_js.png"
          />
        </div>
        <div className="col l4 m4 s4">
          <img
            className="materialboxed"
            data-caption="Redux"
            width="50%"
            src="https://cdn-images-1.medium.com/max/1600/1*dlapmYAhWBkrFuHm020qlg.png"
          />
        </div>

        <div className="col l4 m4 s4">
          <img
            className="materialboxed"
            data-caption="React"
            width="50%"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
          />
        </div>

        <div className="col l4 m4 s4">
          <img
            className="materialboxed"
            data-caption="Materialize"
            width="50%"
            src="https://www.brandeps.com/logo-download/M/Materialize-CSS-01.png"
          />
        </div>

        <div className="col l12 m12 s12 center-align valign-wrapper">
          <div className="col l2 m2 s2 center-align valign-wrapper" />
          <div className="col l4 m4 s4 center-align valign-wrapper">
            <img
              className="materialboxed rigth-align"
              data-caption="TensorFlow"
              width="50%"
              src="http://www.freelogovectors.net/wp-content/uploads/2018/07/tensorflow-logo.png"
            />
          </div>
          <div className="col l4 m4 s4 center-align valign-wrapper">
            <img
              className="materialboxed left-align valign-wrapper"
              data-caption="Coco"
              width="50%"
              src="   http://cocodataset.org/images/coco-logo.png"
            />
          </div>
          <div className="col l2 m2 s2 center-align valign-wrapper" />
        </div>
      </div>{' '}
    </div>
  )
}

export default About
