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

const setFeatureToggle = (key, value) => {
  return {
    type: actionTypes.SET_FEATURE_TOGGLE,
    value,
    key,
  }
}

export { 
  updatePage,
  loadTo,
  resetLoad,
  setFeatureToggle,
};