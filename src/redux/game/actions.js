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
      return { type: actionTypes.BECOME_SPECTATOR };
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

const updateGameWord = (word) => {
  return {
    type: actionTypes.UPDATE_GAME_WORD,
    word,
  }
}
const updateGameTime = (time) => {
  return {
    type: actionTypes.UPDATE_GAME_TIME,
    time,
  }
}

const updateWordReady = (list) => {
  return {
    type: actionTypes.UPDATE_WORD_LIST,
    list,
  }
}

const updateRemainingWordCount = (count) => {
  return {
    type: actionTypes.UPDATE_WORD_COUNT,
    count,
  }
}

const resetGame = (game) => {
  return {
    type: actionTypes.RESET_GAME,
  }
}

const overrideGame = (game) => {
  return {
    type: actionTypes.OVERRIDE_GAME,
    game,
  }
}

export { 
  updatePoints,
  updateStatus,
  updateContent,
  updateGameType,
  updateWordReady,
  updateGameWord,
  updateGameTime,
  updateRemainingWordCount,
  overrideGame,
  resetGame,
};