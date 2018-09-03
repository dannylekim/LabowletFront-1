import initialState from './initialState';
import actionTypes from './actionTypes';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER_NAME:
      return Object.assign({}, state, {
        name: action.user,
      });
    case actionTypes.UPDATE_USER_TEAM:
      return Object.assign({}, state, {
        team: action.team,
      });
    case actionTypes.UPDATE_USER_WORDS:
      return Object.assign({}, state, {
        words: action.words,
      });
    default:
      return state;
  }
};

export default reducer;
