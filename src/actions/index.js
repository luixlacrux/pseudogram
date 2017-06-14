import firebase from '../utils/firebase'

export const SIGN_OUT_USER = 'SIGN_OUT_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_USER = 'AUTH_USER'

export function signUpUser (crendentials) {
  return dispatch => {
    firebase.auth()
      .createUserWithEmailAndPassword(crendentials.email, crendentials.password)
      .catch(error => {
        console.error(error)
        dispatch(authError(error))
      })
  }
}

export function socialLoginUser (provider) {
  return dispatch => {
    firebase.auth()
      .signInWithPopup(provider)
      .catch(error => {
        console.error(error)
        dispatch(authError(error))
      })
  }
}

export function signInUser (credentials) {
  return dispatch => {
    firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
        .catch(error => {
          console.error(error)
          dispatch(authError(error))
        })
  }
}

export function signOutUser () {
  return dispatch => {
    firebase.auth().signOut()
      .then(() => dispatch(authUserSignOut()))
  }
}

export function verifyAuth () {
  return dispatch => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) dispatch(authUser(user))
      else dispatch(signOutUser())
    })
  }
}

export function authUser (user) {
  return {
    type: AUTH_USER,
    user,
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  }
}

export function authUserSignOut () {
  return {
    type: SIGN_OUT_USER,
  }
}
