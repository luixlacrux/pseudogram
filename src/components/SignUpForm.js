import React from 'react'
import TextField from 'react-md/lib/TextFields'
import Button from 'react-md/lib/Buttons/Button'

const SignUpForm = () => (
  <form className="SignUpForm md-grid">
    <TextField
      id="signup-email"
      label="Correo electronico"
      type="email"
      className="md-cell md-cell--12"
      required
    />
    <TextField
      id="signup-name"
      label="Nombre completo"
      className="md-cell md-cell--12"
      required
    />
    <TextField
      id="signup-username"
      label="Nombre de usuario"
      className="md-cell md-cell--12"
      required
    />
    <TextField
      id="signup-password"
      label="Contrasena"
      type="password"
      className="md-cell md-cell--12"
      required
    />
    <Button raised primary label="Registrarse" className="md-cell md-cell--8" />
  </form>
)

export default SignUpForm
