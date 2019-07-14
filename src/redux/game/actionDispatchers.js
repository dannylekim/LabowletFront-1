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

const sendWord = (word = null) => {
  return async (dispatch, getState) => {
    try {
      if(word != null) {
        return await getState().user.socket.send(`/server/room/${getState().room.code}/game/newWord`, {}, word);
      }
      return await getState().user.socket.send(`/server/room/${getState().room.code}/game/skipWord`, {});
    } catch (err) {
      throw new Error(`Error while guessing word: ${err.message}`);
    }
    
  }
}

/**
 * @description used to start next turn or next round. This will ultimately start the timer.
 */
const startStep = () => {
  return async (dispatch, getState) => {
    try {
      await getState().user.socket.send(`/server/room/${getState().room.code}/game/startStep`, {});
    } catch (err) {
      throw new Error(`Error while starting new turn/round: ${err.message}`);
    }
  }
}

export default { 
  updatePoints,
  updateStatus,
  updateContent,
  sendWord,
  startStep,
};