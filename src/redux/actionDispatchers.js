import applicationActions from './application/actionDispatchers';
import roomActions from './room/actionDispatchers';
import userActions from './user/actionDispatchers';

export default Object.assign(
  {},
  applicationActions,
  roomActions,
  userActions,
);