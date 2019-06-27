import { combineReducers } from 'redux';

import globalReducer from './Global';

const reducers = combineReducers({
  global: globalReducer,
});

export default reducers;
