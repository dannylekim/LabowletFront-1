import initialState from './initialState';
import actionTypes from './actionTypes';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_SETTING:
      return Object.assign({}, state, {
        settings: action.newSetting,
      });
    case actionTypes.UPDATE_ROOM_CODE:
      return Object.assign({}, state, {
        code: action.code,
      });
    default:
      return state;
  }
};

export default reducer;
