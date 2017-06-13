import firebase from '../utils/firebase'

export const SIGN_OUT_USER = 'SIGN_OUT_USER'
export const AUTH_ERROR = 'AUTH_ERROR'
export const AUTH_USER = 'AUTH_USER'

export function signInUser (credentials) {
  return dispatch => {
    firebase.auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
        .then(response => dispatch(authUser()))
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
      if (user) dispatch(authUser())
      else dispatch(signOutUser())
    })
  }
}

export function authUser () {
  return {
    type: AUTH_USER,
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
