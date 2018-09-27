import actionTypes from './actionTypes';

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

export default { 
  updatePage,
  loadTo,
  resetLoad,
};