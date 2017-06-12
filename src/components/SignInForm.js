import React from 'react'
import TextField from 'react-md/lib/TextFields'
import Button from 'react-md/lib/Buttons/Button'

const SignInForm = () => (
  <form className="SignInForm md-grid">
    <TextField
      id="signin-username"
      label="Usuario"
      className="md-cell md-cell--12"
      required
    />
    <TextField
      id="signin-password"
      label="Contrasena"
      type="password"
      className="md-cell md-cell--12"
      required
    />
    <Button raised primary label="Iniciar sessión" className="md-cell md-cell--8" />
  </form>
)

export default SignInForm
