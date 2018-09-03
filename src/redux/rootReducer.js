import { combineReducers } from 'redux';

import applicationReducers from './application/reducers';
import roomReducers from './room/reducers';

const rootReducer = combineReducers({
  application: applicationReducers,
  room: roomReducers,
});

export default rootReducer;
