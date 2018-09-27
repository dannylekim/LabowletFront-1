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
    default:
      return state;
  }
};

export default reducer;
