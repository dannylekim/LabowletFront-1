import actions from './actions';

const updateUserName = (user) => {
  return (dispatch) => dispatch(actions.updateUserName(user));
}

const updateUserId = (id) => {
  return (dispatch) => dispatch(actions.updateUserId(id));

}

const updateUserTeam = (user) => {
  return (dispatch) => dispatch(actions.updateUserTeam(user));
}

const updateUserWords = (user) => {
  return (dispatch) => dispatch(actions.updateUserWords(user));
}

const connectUser = (socket) => {
  return (dispatch) => dispatch(actions.connectUser(socket));
}

export default {
  updateUserName,
  updateUserId,
  updateUserTeam,
  updateUserWords,
  connectUser,
};