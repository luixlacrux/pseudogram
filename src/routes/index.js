import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, withRouter } from 'react-router-dom'

import App from '../containers/App'
import SignIn from '../containers/SignIn'
import SignUp from '../containers/SignUp'

const PrivateRoute = ({ component: Component, authenticated, ...props }) => (
  <Route {...props} render={props => (
    authenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )} />
)

const PublicRoute = ({ component: Component, authenticated, ...props }) => (
  <Route {...props} render={props => (
    !authenticated
      ? <Component {...props} />
      : <Redirect to="/" />
  )}/>
)

const Routes = ({ authenticated }) => (
  <div>
    <PrivateRoute path="/" component={App} authenticated={authenticated} />
    <PublicRoute path="/signin" component={SignIn} authenticated={authenticated} />
    <PublicRoute path="/signup" component={SignUp} authenticated={authenticated} />
  </div>
)

function mapStateToProps (state = {}) {
  return {
    authenticated: state.auth.authenticated,
  }
}

export default withRouter(connect(mapStateToProps)(Routes))
