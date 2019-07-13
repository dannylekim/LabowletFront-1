import actionTypes from './actionTypes';

const updatePoints = (point) => {
  return {
    type: actionTypes.UPDATE_POINT,
    point,
  }
}

const updateStatus = (newStatus) => {
  switch (newStatus) {
    case 'ACTOR':
      return { type: actionTypes.BECOME_ACTOR };
    case 'GUESSER':
      return { type: actionTypes.BECOME_GUESSER };
    case 'SPECTATOR':
      return { type: actionTypes.BECOME_SPECTATOR };
    default:
      break;
  }
}


const updateContent = (content) => {
  return {
    type: actionTypes.UPDATE_GAME_CONTENT,
    content,
  }
}

const updateGameType = (gameType) => {
  return {
    type: actionTypes.UPDATE_GAME_TYPE,
    gameType,
  }
}

const updateWordReady = (list) => {
  return {
    type: actionTypes.UPDATE_WORD_LIST,
    list,
  }
}

export { 
  updatePoints,
  updateStatus,
  updateContent,
  updateGameType,
  updateWordReady,
};