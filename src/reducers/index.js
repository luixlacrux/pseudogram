import { combineReducers } from 'redux'
import authReducer from './auth'
import photosReducer from './photos'
import uploadReducer from './upload'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  photos: photosReducer,
  upload: uploadReducer,
})

export default rootReducer
