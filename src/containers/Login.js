import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const Login = ({ user, location, dispatch }) => {
  const handleLogin = () => {
    dispatch({ type: 'LOGIN' })
  }

  const { from } = location.state || { from: { pathname: '/' } }

  if (user.isAuth) {
    return <Redirect to={from} />
  } else {
    return (
      <div>
        <button onClick={handleLogin}>Click to sign in</button>
      </div>
    )
  }
}

function mapStateToProps (state={}) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)
