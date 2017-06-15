import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import { verifyAuth } from '../actions/auth'

const logger = createLogger()

const createStoreWithMiddleware = process.env.NODE_ENV !== 'production'
  ? applyMiddleware(thunk, logger)(createStore)
  : applyMiddleware(thunk)(createStore)

const store = createStoreWithMiddleware(rootReducer)

store.dispatch(verifyAuth())

export default store
