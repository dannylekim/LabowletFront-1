import actions from './actions';

const updatePage = (newPage) => {
  return (dispatch) => dispatch(actions.updatePage(newPage));
}

export default { updatePage };