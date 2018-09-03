import actionTypes from './actionTypes';

const updateSetting = (newSetting) => {
  return {
    type: actionTypes.UPDATE_SETTING,
    newSetting,
  }
}

export default { updateSetting };