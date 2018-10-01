import actions from './actions';

const updatePage = (newPage) => {
  return (dispatch) => dispatch(actions.updatePage(newPage));
}

const loadTo = (loadingProgress) => {
  return (dispatch) => dispatch(actions.loadTo(loadingProgress));
}

const resetLoad = () => {
  return (dispatch) => dispatch(actions.resetLoad());
} 

export default { 
  updatePage,
  loadTo,
  resetLoad,
};