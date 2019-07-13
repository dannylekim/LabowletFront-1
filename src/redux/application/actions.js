import actionTypes from './actionTypes';
import { staging, dev} from '../../config/RESTurl.json';
const updatePage = (newPage) => {
  return {
    type: actionTypes.UPDATE_PAGE,
    newPage,
  }
}

const loadTo = (loadingProgress) => {
  return {
    type: actionTypes.LOAD_PROGRESS,
    loadingProgress,
  }
}

const resetLoad = () => {
  return {
    type: actionTypes.RESET_LOAD,
  }
}

/**
 * Feature Toggles
 */


/** 1 - Toggle between dev/staging server */
export const toggleServer = () => {
  return (dispatch, getState) => {
    if (getState().applicationReducers.server === staging) {
      dispatch(actionTypes)
    }
  };
}

export { 
  updatePage,
  loadTo,
  resetLoad,
};