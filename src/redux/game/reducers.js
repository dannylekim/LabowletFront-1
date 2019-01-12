import initialState from './initialState';
import actionTypes from './actionTypes';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_POINTS:
      return Object.assign({}, state, {
        teamPoints: action.point,
      });
    case actionTypes.BECOME_ACTOR:
      return Object.assign({}, state, {
        status: "Actor",
      });
    case actionTypes.BECOME_GUESSER:
      return Object.assign({}, state, {
        status: "Guesser",
      });
    case actionTypes.BECOME_SPECTATOR:
      return Object.assign({}, state, {
        status: "Spectator",
      });
    case actionTypes.UPDATE_GAME_CONTENT:
      return Object.assign({}, state, {
        content: action.content,
      });
    case actionTypes.UPDATE_GAME_TYPE:
      return Object.assign({}, state, {
        gameType: action.gameType,
      });
    default:
      return state;
  }
};

export default reducer;
