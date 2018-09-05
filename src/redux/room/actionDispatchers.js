import actions from './actions';
import UserRequests from '../../services/UserHTTPRequests';
import RoomRequests from '../../services/RoomHTTPRequests';

const updateSetting = (newSetting) => {
  return (dispatch, getState) => {
    const body = {
      name: getState().user.name,
    };

    UserRequests.createUser(body).then((response) => {
      dispatch(actions.updateSetting(newSetting));
      //TODO
      //RoomRequests.createRoom()
    }).catch((err) => {
      console.error('Error in redux:', err);
    });
  };
}

export default {
  updateSetting,
};