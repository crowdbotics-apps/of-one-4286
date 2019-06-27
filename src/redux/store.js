import {
  compose,
  createStore,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise'

import reducers from './reducers';


// redux debugging
let composeEnhancers = compose;
if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(reducers, composeEnhancers(applyMiddleware(promise)));

export default store;
