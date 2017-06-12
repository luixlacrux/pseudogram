import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-md/lib/Buttons/Button'

const SocialButtons = ({ handleLogin }) => (
  <div className="social-btns md-grid">
    <Button
      raised
      primary
      label="Inicia session con Facebook"
      iconClassName="fa fa-facebook-official"
      onClick={handleLogin}
      className="md-cell md-cell--11"
    />
    <Button
      raised
      secondary
      label="Inicia session con Google"
      iconClassName="fa fa-google"
      onClick={handleLogin}
      className="md-cell md-cell--11"
    />
    <div className="Login-divider md-cell md-cell--12">OR</div>
  </div>
)

SocialButtons.propTypes ={
  handleLogin: PropTypes.func.isRequired,
}

export default SocialButtons
