import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import '../styles/login.css'

import SocialButtons from '../components/SocialButtons'
import SignInForm from '../components/SignInForm'

const SignIn = ({ user, location, dispatch }) => {
  const handleLogin = () => dispatch({ type: 'LOGIN' })

  const { from } = location.state || { from: { pathname: '/' } }

  if (user.isAuth) {
    return <Redirect to={from} />
  } else {
    return (
      <DocumentTitle title="Sign In | Pseudogram">
        <section className="Login md-grid">
          <div className="Login-container md-cell md-cell--6-tablet md-cell--5-desktop">
            <h1 className="Login-title Title">Pseudogram</h1>
            <SocialButtons handleLogin={handleLogin} />
            <SignInForm />
          </div>
          <div className="Login-box Login-container md-cell md-cell--6-tablet md-cell--5-desktop">
            <p>
              ¿No tienes cuenta?
              <Link to={{
                pathname: '/signup',
                state: location.state,
              }}> Registraté</Link>
            </p>
          </div>
        </section>
      </DocumentTitle>
    )
  }
}

SignIn.propTypes = {
  user: PropTypes.shape({
    isAuth: PropTypes.bool,
  }),
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
}

function mapStateToProps (state = {}) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(SignIn)
