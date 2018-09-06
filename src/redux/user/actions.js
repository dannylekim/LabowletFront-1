import actionTypes from './actionTypes';

const updateUserName = (name) => {
  return {
    type: actionTypes.UPDATE_USER_NAME,
    name,
  }
}

const updateUserId = (id) => {
  return {
    type: actionTypes.UPDATE_USER_ID,
    id,
  }
}

const updateUserTeam = (team) => {
  return {
    type: actionTypes.UPDATE_USER_TEAM,
    team,
  }
}

const updateUserWords = (words) => {
  return {
    type: actionTypes.UPDATE_USER_WORDS,
    words,
  }
}

export default {
  updateUserName,
  updateUserId,
  updateUserTeam,
  updateUserWords,
};