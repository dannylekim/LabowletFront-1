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
    case actionTypes.UPDATE_GAME_TIME:
      return {
        ...state,
        currentTime: action.time,
      }
    case actionTypes.UPDATE_GAME_WORD:
      return {
        ...state,
        currentWord: action.word,
      }
    case actionTypes.UPDATE_WORD_LIST:
      return {
        ...state,
        listOfWordsReady: action.list,
      };
    case actionTypes.UPDATE_WORD_COUNT:
      return {
        ...state,
        remainingWords: action.count,
      };
    case actionTypes.UPDATE_READY_ROOM:
      return {
        ...state, 
        readyState: {
          ...state.readyState,
          room: action.status,
        },
      }
    case actionTypes.UPDATE_READY_WORD:
      return {
        ...state, 
        readyState: {
          ...state.readyState,
          word: action.status,
        },
      }
    default:
      return state;
  }
};

export default reducer;
