import { combineReducers } from 'redux'

function userReducer (state = { isAuth: false }, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuth: true
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer
})

export default rootReducer
