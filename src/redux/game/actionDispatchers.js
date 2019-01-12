import * as action from './actions';

const updatePoints = (points) => {
  return (dispatch) => dispatch(action.updatePoints(points));
}

const updateStatus = (status) => {
  return (dispatch) => dispatch(action.updateStatus(status));
}

const updateContent = (content) => {
  return (dispatch) => dispatch(action.updateContent(content));
} 

export default { 
  updatePoints,
  updateStatus,
  updateContent,
};