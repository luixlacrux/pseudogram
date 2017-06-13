import { combineReducers } from 'redux'
import authReducer from './auth'
import { reducer as formReducer } from 'redux-form'

// function userReducer (state = { isAuth: false }, action) {
//   switch (action.type) {
//     case 'LOGIN':
//       return {
//         isAuth: true
//       }
//     default:
//       return state
//   }
// }

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
})

export default rootReducer
