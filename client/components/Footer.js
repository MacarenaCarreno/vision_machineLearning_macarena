import React from 'react'

const Footer = () => {
  return (
    <footer className="page-footer teal lighten-2">
      <div className="container">
        <div className="row">
          <div className="col l6 s12">
            <h5 className="white-text">Vision</h5>
            <p className="grey-text text-lighten-4">
              Machine Learning Image Recognition
            </p>
          </div>
          <div className="col l4 offset-l2 s12">
            <h5 className="white-text" />
            <ul>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="www.macarenacg.com"
                >
                  Macarena Carreno
                </a>
              </li>
              <li>
                <a
                  className="grey-text text-lighten-3"
                  href="https://github.com/MacarenaCarreno/vision_machineLearning_macarena"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">© 2019 by Macarena Carreno</div>
      </div>
    </footer>
  )
}

export default Footer
