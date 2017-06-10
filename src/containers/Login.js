import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from 'react-md/lib/Buttons/Button'

import SigninForm from '../components/SigninForm'

const Login = ({ user, location, dispatch }) => {
  const handleLogin = () => {
    dispatch({ type: 'LOGIN' })
  }

  const { from } = location.state || { from: { pathname: '/' } }

  if (user.isAuth) {
    return <Redirect to={from} />
  } else {
    return (
      <section className="Login md-grid">
        <div className="Login-container md-cell md-cell--middle">
          <h1 className="Login-title Title">Pseudogram</h1>
          <h2 className="Login-subtitle">Regístrate para ver y compartir fotos.</h2>

          <div className="social-btns md-cell">
            <Button
              raised
              primary
              label="Inicia session con Facebook"
              iconClassName="fa fa-facebook-official"
              onClick={handleLogin}
            />
            <Button
              raised
              secondary
              label="Inicia session con Google"
              iconClassName="fa fa-google"
              onClick={handleLogin}
            />
          </div>

          <div className="md-divider-border md-divider-border--below" />
          <SigninForm />
        </div>
      </section>
    )
  }
}

function mapStateToProps (state={}) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)
