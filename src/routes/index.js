import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import App from '../components/App'
import SignIn from '../containers/SignIn'
import SignUp from '../containers/SignUp'

const PrivateRoute = ({ user, component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    user.isAuth ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )} />
)

const NotFound = () => <h1>404 Not Found</h1>

const Routes = ({ user }) => (
  <Switch>
    <PrivateRoute path="/" exact component={App} user={user} />
    <Route path="/signin"  component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route component={NotFound} />
  </Switch>
)

function mapStateToProps (state = {}) {
  return {
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(Routes))
