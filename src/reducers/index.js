import { combineReducers } from 'redux'
import authReducer from './auth'
import photosReducer from './photos'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  photos: photosReducer,
})

export default rootReducer
