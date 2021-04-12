import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './reducers/root'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  rootReducer,
  /* preloadedState, */
  composeWithDevTools(applyMiddleware(thunk, logger))
)

export default store
