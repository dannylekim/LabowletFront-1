import actions from './actions';
import UserRequests from '../../services/UserHTTPRequests';

const updateSetting = (newSetting) => {
  return (dispatch, getState) => {
    const data = {
      name: getState().user.user.name,
    }
    console.log(getState().user)
    UserRequests.createUser().then((response) => {
      dispatch(actions.updateSetting(newSetting));
    }).catch((err) => {
      console.error('Error in redux:', err);
    });
  };
}

export default {
  updateSetting,
};