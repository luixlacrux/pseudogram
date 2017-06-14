import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Switch, Route, Link } from 'react-router-dom'
import { signOutUser } from '../actions'

import Navbar from '../components/Navbar'

class App extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    handleLogout: PropTypes.func.isRequired,
  }

  render () {
    return (
      <DocumentTitle title="Pseudogram">
        <section className="App">
          <Navbar
            photoURL={this.props.user.photoURL}
            displayName={this.props.user.displayName}
            onLogout={this.props.handleLogout}
          />
          <div className="App-intro">
            <Switch>
              <Route path="/" exact render={() => <h1>Home <Link to="/photo/1">Photo 1</Link></h1>} />
              <Route path="/photo/:id" render={() => <h1>Photo 1 <Link to="/">Home</Link></h1>} />
              <Route render={() => <h1>Not Found</h1>} />
            </Switch>
          </div>
        </section>
      </DocumentTitle>
    )
  }
}

function mapStateToProps (state) {
  const [ user ] = state.auth.user.providerData

  return {
    user,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    handleLogout: () => dispatch(signOutUser()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
