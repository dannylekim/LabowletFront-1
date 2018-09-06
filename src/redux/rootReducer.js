import { combineReducers } from 'redux';

import applicationReducers from './application/reducers';
import roomReducers from './room/reducers';
import userReducers from './user/reducers';

const rootReducer = combineReducers({
  application: applicationReducers,
  room: roomReducers,
  user: userReducers,
});

export default rootReducer;
