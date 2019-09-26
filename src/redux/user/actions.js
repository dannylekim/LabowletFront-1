import actionTypes from './actionTypes';

const updateUserName = (name) => {
  return {
    type: actionTypes.UPDATE_USER_NAME,
    name,
  }
}

const updateUserId = (id, uniqueIconReference) => {
  return {
    type: actionTypes.UPDATE_USER_ID,
    id,
    uniqueIconReference
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

const connectUser = (socket) => {
  return {
    type: actionTypes.CONNECT_USER_TO,
    socket,
  }
}

const updateUserToken = (token) => {
  return {
    type: actionTypes.UPDATE_USER_TOKEN,
    token,
  }
}

const overrideUser = (user) => {
  return {
    type: actionTypes.OVERRIDE_USER,
    user,
  }
}

const clearUser = () => {
  return {
    type: actionTypes.OVERRIDE_USER,
    user: {
      name: '',
      id: '',
      team: '',
      words: [],
      token: '',
      uniqueIconReference: '',
      socket: null,
    }
  }
}

export {
  updateUserName,
  updateUserId,
  updateUserTeam,
  updateUserWords,
  connectUser,
  updateUserToken,
  overrideUser,
  clearUser
};