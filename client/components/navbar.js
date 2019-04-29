import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, NavLink} from 'react-router-dom'
import {logout} from '../store'

class Navbar extends React.Component {
  componentDidMount() {
    var elems = document.querySelectorAll('.sidenav')
    var instances = M.Sidenav.init(elems, {})
  }

  render() {
    return (
      <div>
        <nav className="nav-extended teal lighten-2">
          <div className="nav-wrapper">
            <NavLink strict to="/" className="brand-logo">
              <i className="large material-icons">fingerprint</i> Vision
            </NavLink>

            <a href="" data-target="mobile-demo" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>
                <NavLink to="/camera-app">CAMARA</NavLink>
              </li>
              <li>
                <NavLink to="/predictions">PREDICTIONS</NavLink>
              </li>

              <li>
                <NavLink to="/about">ABOUT</NavLink>
              </li>
            </ul>
          </div>
        </nav>
        <ul className="sidenav" id="mobile-demo">
          <li>
            <NavLink to="/">HOME</NavLink>
          </li>
          <li>
            <NavLink to="/camera-app">CAMARA</NavLink>
          </li>

          <li>
            <NavLink to="/predictions">PREDICTIONS</NavLink>
          </li>

          <li>
            <NavLink to="/about">ABOUT</NavLink>
          </li>
        </ul>
      </div>
    )
  }
}
/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
