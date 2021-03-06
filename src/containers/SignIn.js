import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { signInUser, socialLoginUser } from '../actions/auth'
import '../styles/login.css'

import Button from 'react-md/lib/Buttons/Button'

import SocialButtons from '../components/SocialButtons'
import FormTextField from '../components/FormTextField'

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Por favor ingrese un email.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Por favor ingrese un email valido.'
  }

  if (!values.password) {
    errors.password = 'Por favor ingrese su contraseña.'
  }

  return errors
}

const SignIn = ({
  location,
  signInUser,
  socialLoginUser,
  handleSubmit,
  authenticatedError
}) => {
  const handleFormSubmit = (values) => {
    signInUser(values)
  }

  return (
    <DocumentTitle title="Sign In | Pseudogram">
      <section className="Login md-grid">
        <div className="Login-container md-cell md-cell--6-tablet md-cell--5-desktop">
          <h1 className="Login-title Title">Pseudogram</h1>
          <SocialButtons handleLogin={socialLoginUser} />

          {authenticatedError && <p style={{color: 'red'}}>{authenticatedError}</p>}

          <form onSubmit={handleSubmit(handleFormSubmit)} className="SignInForm md-grid">
            <Field
              id="signin-email"
              name="email"
              component={FormTextField}
              type="text"
              label="Correo electronico"
              className="md-cell md-cell--12"
              required
            />
            <Field
              id="signin-password"
              name="password"
              component={FormTextField}
              label="Contrasena"
              type="password"
              className="md-cell md-cell--12"
              required
            />
            <Button raised primary type="submit" label="Iniciar sessión" className="md-cell md-cell--8" />
          </form>
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

SignIn.propTypes = {
  authenticatedError: PropTypes.string,
  signInUser: PropTypes.func,
  handleSubmit: PropTypes.func,
  location: PropTypes.object,
}

function mapStateToProps (state = {}) {
  return {
    authenticatedError: state.auth.error,
  }
}

export default connect(mapStateToProps, {
  signInUser,
  socialLoginUser,
})(reduxForm({
  form: 'signin',
  validate,
})(SignIn))
