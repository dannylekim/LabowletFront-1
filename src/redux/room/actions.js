import actionTypes from './actionTypes';

const updateSetting = (newSetting) => {
  return {
    type: actionTypes.UPDATE_SETTING,
    newSetting,
  }
}

const updateCode = (code) => {
  return {
    type: actionTypes.UPDATE_ROOM_CODE,
    code,
  }
}

const clearRoom = () => updateSetting({});


export { 
  updateSetting,
  updateCode,
  clearRoom,
};