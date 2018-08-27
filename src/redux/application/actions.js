import actionTypes from './actionTypes';

const updatePage = (newPage) => {
  return {
    type: actionTypes.UPDATE_PAGE,
    newPage,
  }
}

export default { updatePage };