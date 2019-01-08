import {
  updatePage,
  loadTo,
  resetLoad,
} from './actions';

const _updatePage = (newPage) => {
  return (dispatch) => dispatch(updatePage(newPage));
}

const _loadTo = (loadingProgress) => {
  return (dispatch) => dispatch(loadTo(loadingProgress));
}

const _resetLoad = () => {
  return (dispatch) => dispatch(resetLoad());
} 

export default { 
  updatePage: _updatePage,
  loadTo: _loadTo,
  resetLoad: _resetLoad,
};