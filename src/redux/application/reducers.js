import initialState from './initialState';
import actionTypes from './actionTypes';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PAGE:
      return Object.assign({}, state, {
        page: action.newPage,
      });
    default:
      return state;
  }
};

export default reducer;
