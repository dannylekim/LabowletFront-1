import actions from './actions';

const updateSetting = (newSetting) => {
  return (dispatch) => dispatch(actions.updateSetting(newSetting));
}

export default { updateSetting };