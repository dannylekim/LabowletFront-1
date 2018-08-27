import { combineReducers } from 'redux';

import applicationReducers from './application/reducers';

const rootReducer = combineReducers({
  application: applicationReducers,
});

export default rootReducer;
