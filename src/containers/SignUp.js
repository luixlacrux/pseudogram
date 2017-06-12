import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import '../styles/login.css'

import SocialButtons from '../components/SocialButtons'
import SignUpForm from '../components/SignUpForm'

const SignUp = ({ user, location, dispatch }) => {
  const handleLogin = () => dispatch({ type: 'LOGIN' })

  const { from } = location.state || { from: { pathname: '/' } }

  if (user.isAuth) {
    return <Redirect to={from} />
  } else {
    return (
      <section className="Login md-grid">
        <div className="Login-container md-cell md-cell--6-tablet md-cell--5-desktop">
          <h1 className="Login-title Title">Pseudogram</h1>
          <h2 className="Login-subtitle">Registraté para ver y compartir fotos.</h2>
          <SocialButtons handleLogin={handleLogin} />
          <SignUpForm />
        </div>
        <div className="Login-box Login-container md-cell md-cell--6-tablet md-cell--5-desktop">
          <p>
            ¿Ya tienes cuenta?
            <Link to={{
              pathname: '/signin',
              state: location.state,
            }}> Inicia Sessión</Link>
          </p>
        </div>
      </section>
    )
  }
}

SignUp.propTypes = {
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

export default connect(mapStateToProps)(SignUp)
