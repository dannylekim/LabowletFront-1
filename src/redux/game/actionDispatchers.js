import * as action from './actions';
import * as Sentry from '@sentry/browser';

import { updatePage } from '../application/actions'; 
import { connectUser } from '../user/actions';
import { clearRoom } from '../room/actions';

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
      Sentry.captureException(err);
      throw new Error(`Error while starting new turn/round: ${err.message}`);
    }
  }
}

/**
 * a socket call to reset the game. It will return
  NULL game to the socket endpoint
  NULL wordState to the socket endpoint
  and the currentRoom to the room endpoint
 */
const resetGame = () => {
  return async (dispatch, getState) => {
    try {
      await getState().user.socket.send(`/server/room/${getState().room.code}/game/resetGame`, {});
    } catch (err) {
      Sentry.captureException(err);
      throw new Error(`Error while starting new turn/round: ${err.message}`);
    }
  }
}

/**
 * sock call to disconnect user from room session.
 */
const leaveRoom = () => {
  return async (dispatch, getState) => {
    try {
      if (getState().user.socket) {
        await getState().user.socket.send(`/server/room/${getState().room.code}/leaveRoom`, {});
        // kill socket
        dispatch(connectUser(null));
        dispatch(clearRoom({}));
      }
      dispatch(updatePage('HOME'));
    } catch (err) {
      Sentry.captureException(err);
      throw new Error(`leaving room error: ${err.message}`);
    }
  }
}

const giveUpRound = () => {
  return async (dispatch, getState) => {
    try {
      return await getState().user.socket.send(`/server/room/${getState().room.code}/game/endTurn`, {});
    } catch (err) {
      Sentry.captureException(err);
      throw new Error(`Error while starting giving up: ${err.message}`);
    }
  }
}

/**
 * to be used by host when users are on `SUMMARY` page. This will trigger the `/game/` call with currentPoints: null 
 * which will ultimately redirect user to `GAME`
 */
const nextRound = () => {
  return async (dispatch, getState) => {
    try {
      await getState().user.socket.send(`/server/room/${getState().room.code}/game/nextRound`, {});
    } catch (err) {
      Sentry.captureException(err);
      throw new Error(`Error while going to next round: ${err.message}`);
    }
  }
}

export default { 
  updatePoints,
  updateStatus,
  updateContent,

  // game socket calls
  sendWord,
  startStep,
  resetGame,
  leaveRoom,
  giveUpRound,
  nextRound
};