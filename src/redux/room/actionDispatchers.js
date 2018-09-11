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
const createRoom = (newSetting) => {
  return (dispatch, getState) => {
    const body = {
      name: getState().user.name,
    };
    UserRequests.createUser(body).then((response) => {
      const formattedSettings = Adapters.RoomSettings(newSetting);
      const authToken = response.headers['x-auth-token'];

      dispatch(UserActions.updateUserId(response.data.id))
      dispatch(actions.updateSetting(formattedSettings));
      
      RoomRequests.createRoom(getState().room.settings, authToken).then((roomResponse) => {
        console.log(roomResponse)
        if(roomResponse) {
          dispatch(actions.updateCode(roomResponse.data.roomCode));
        } else {
          alert('Something went wrong...')
        }
      }).catch((err) => {
        console.error('Error while creating room in redux:', err)
      })
    }).catch((err) => {
      console.error('Error while creating user in redux:', err);
    });
  };
}

const joinRoom = (roomCode) => {
  return (dispatch, getState) => {
    const body = {
      name: getState().user.name,
    };
    UserRequests.createUser(body).then((response) => {
      dispatch(UserActions.updateUserId(response.data.id));
      const authToken = response.headers['x-auth-token'];

      RoomRequests.joinRoom({ roomCode }, authToken).then((roomResponse) => {
        dispatch(actions.updateCode(roomResponse.data.roomCode));
      }).catch((err) => {
        console.error('Error while joining room in redux:', err)
      })
    }).catch((err) => {
      console.error('Error while creating user in redux:', err);
    });
  }
}

export default {
  createRoom,
  joinRoom,
};