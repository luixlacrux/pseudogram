import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'
import firebase from '../utils/firebase'

const SocialButtons = ({ handleLogin }) => {
  const handleLoginGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    handleLogin(provider)
  }

  const handleLoginFacebook = () => {
    console.log('Login with facebook is not working.')
    // const provider = new firebase.auth.FacebookAuthProvider()
    // handleLogin(provider)
  }

  return (
    <div className="social-btns md-grid">
      <Button
        raised
        primary
        label="Inicia session con Facebook"
        iconClassName="fa fa-facebook-official"
        onClick={handleLoginFacebook}
        className="md-cell md-cell--11"
      />
      <Button
        raised
        secondary
        label="Inicia session con Google"
        iconClassName="fa fa-google"
        onClick={handleLoginGoogle}
        className="md-cell md-cell--11"
      />
      <div className="Login-divider md-cell md-cell--12">OR</div>
    </div>
  )
}

SocialButtons.propTypes ={
  handleLogin: PropTypes.func.isRequired,
}

export default SocialButtons
