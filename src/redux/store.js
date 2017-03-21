import { compose, createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducer'

const reducer = combineReducers(reducers)

export default function initStore(initialState) {
  if (typeof window === 'undefined') {
    return createStore(reducer, initialState, applyMiddleware(thunk))
  } else {
    if (!window.store) {
      window.store = createStore(reducer, initialState,
        compose(
          applyMiddleware(thunk),
          window.devToolsExtension ? window.devToolsExtension() : f => f
        )
      )
    }
    return window.store
  }
}
