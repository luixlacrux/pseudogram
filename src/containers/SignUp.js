import React from 'react'
import PropTypes from 'prop-types'
import DocumentTitle from 'react-document-title'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'react-md/lib/Buttons/Button'
import { signUpUser, socialLoginUser } from '../actions/auth'
import '../styles/login.css'

import SocialButtons from '../components/SocialButtons'
import FormTextField from '../components/FormTextField'

const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Por favor ingrese un email.'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Por favor ingrese un email valido.'
  }

  if (!values.password) {
    errors.password = 'Por favor ingrese una contraseña.'
  }

  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Por favor ingrese otra vez su contraseña.'
  }

  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Contraseñas no coinciden.'
  }

  return errors
}

const SignUp = ({
  location,
  signUpUser,
  socialLoginUser,
  handleSubmit,
  authenticatedError
}) => {
  const handleFormSubmit = (values) => {
    signUpUser(values)
  }

  return (
    <DocumentTitle title="Sign Up | Pseudogram">
      <section className="Login md-grid">
        <div className="Login-container md-cell md-cell--6-tablet md-cell--5-desktop">
          <h1 className="Login-title Title">Pseudogram</h1>
          <h2 className="Login-subtitle">Registraté para ver y compartir fotos.</h2>
          <SocialButtons handleLogin={socialLoginUser} />

          {authenticatedError &&
            <p style={{color: 'red', textAlign: 'center'}}>{authenticatedError}</p>
          }

          <form onSubmit={handleSubmit(handleFormSubmit)} className="SignUpForm md-grid">
            <Field
              id="signup-email"
              name="email"
              component={FormTextField}
              label="Correo electronico"
              type="email"
              className="md-cell md-cell--12"
              required
            />
            <Field
              id="signup-name"
              name="name"
              component={FormTextField}
              label="Nombre completo"
              className="md-cell md-cell--12"
              required
            />
            <Field
              id="signup-password"
              name="password"
              component={FormTextField}
              label="Contrasena"
              type="password"
              className="md-cell md-cell--12"
              required
            />
            <Field
              id="signup-passwordConfirm"
              name="passwordConfirmation"
              component={FormTextField}
              label="Confirmar contrasena"
              type="password"
              className="md-cell md-cell--12"
              required
            />
            <Button raised primary type="submit" label="Registrarse" className="md-cell md-cell--8" />
          </form>
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
    </DocumentTitle>
  )
}

SignUp.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object,
}

function mapStateToProps (state = {}) {
  return {
    authenticatedError: state.auth.error
  }
}

export default connect(mapStateToProps, {
  signUpUser,
  socialLoginUser,
})(reduxForm({
  form: 'signup',
  validate,
})(SignUp))
