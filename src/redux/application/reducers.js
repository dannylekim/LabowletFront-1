import initialState from './initialState';
import actionTypes from './actionTypes';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PAGE:
      return Object.assign({}, state, {
        page: action.newPage,
      });
    case actionTypes.LOAD_PROGRESS:
      return Object.assign({}, state, {
        loadingProgress: action.loadingProgress,
      });
    case actionTypes.RESET_LOAD:
      return Object.assign({}, state, {
        loadingProgress: 0,
      });
    case actionTypes.TOGGLE_SERVER:
      return Object.assign({}, state, {
        server: {
          url: action.newServer,
          label: action.serverName
        }
      });
    case actionTypes.SET_FEATURE_TOGGLE:
      return {
        ...state,
        [action.key]: action.value,
      };
    default:
      return state;
  }
};

export default reducer;
