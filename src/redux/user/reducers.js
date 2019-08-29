import initialState from './initialState';
import actionTypes from './actionTypes';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_NAME:
      return Object.assign({}, state, {
        name: action.name,
      });
    case actionTypes.UPDATE_USER_ID:
      return Object.assign({}, state, {
        id: action.id,
        uniqueIconReference: action.uniqueIconReference
      });
    case actionTypes.UPDATE_USER_TEAM:
      return Object.assign({}, state, {
        team: action.team,
      });
    case actionTypes.UPDATE_USER_WORDS:
      return Object.assign({}, state, {
        words: action.words,
      });
    case actionTypes.CONNECT_USER_TO:
      return Object.assign({}, state, {
        socket: action.socket,
      });
    case actionTypes.UPDATE_USER_TOKEN:
      return Object.assign({}, state, {
        token: action.token,
      });
    case actionTypes.OVERRIDE_USER:
      return {
        ...state,
        ...action.user,
      };
    default:
      return state;
  }
};

export default reducer;
