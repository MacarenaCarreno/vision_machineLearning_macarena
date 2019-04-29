import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {About, CameraApp, Predictions} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
const Routes = () => {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={CameraApp} />
        <Route exact path="/camera-app" component={CameraApp} />
        <Route exact path="/about" component={About} />
        <Route exact path="/predictions" component={Predictions} />
      </Switch>
    </main>
  )
}
export default Routes
