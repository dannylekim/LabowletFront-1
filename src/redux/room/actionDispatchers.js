import actions from './actions';
import UserRequests from '../../services/UserHTTPRequests';
import RoomRequests from '../../services/RoomHTTPRequests';

import Adapters from '../../services/Adapters';
import UserActions from '../user/actionDispatchers';


const updateSetting = (newSetting) => {
  return (dispatch, getState) => {
    const body = {
      name: getState().user.name,
    };
    UserRequests.createUser(body).then((response) => {
      const formattedSettings = Adapters.RoomSettings(newSetting);

      dispatch(UserActions.updateUserId(response.data.id))
      dispatch(actions.updateSetting(formattedSettings));
      console.log(formattedSettings);
      console.log(getState().user.id);
      RoomRequests.createRoom(formattedSettings, getState().user.id).then((roomResponse) => {
        console.log(roomResponse);
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