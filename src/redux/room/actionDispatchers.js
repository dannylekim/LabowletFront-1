import actions from './actions';
import UserRequests from '../../services/UserHTTPRequests';
import RoomRequests from '../../services/RoomHTTPRequests';

import Adapters from '../../services/Adapters';
import UserActions from '../user/actionDispatchers';


/**
 * Creates a user and a room with settings passed in params.
 * The user is created here in order to have a default user prior to room creation
 * @param {Object} newSetting
 */
const updateSetting = (newSetting) => {
  return (dispatch, getState) => {
    const body = {
      name: getState().user.name,
    };
    UserRequests.createUser(body).then((response) => {
      const formattedSettings = Adapters.RoomSettings(newSetting);
      const authToken = response.headers['x-auth-token'];

      dispatch(UserActions.updateUserId(response.data.id))
      dispatch(actions.updateSetting(formattedSettings));
      
      RoomRequests.createRoom(formattedSettings, authToken).then((roomResponse) => {
        dispatch(actions.updateCode(roomResponse.data.roomCode));
      }).catch((err) => {
        console.error('Error while creating room in redux:', err)
      })
    }).catch((err) => {
      console.error('Error while creating user in redux:', err);
    });
  };
}

export default {
  updateSetting,
};