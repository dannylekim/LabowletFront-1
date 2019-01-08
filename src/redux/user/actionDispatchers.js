import * as actions from './actions';
import configs from '../../config/RESTurl.json'; 
import SockJS from 'sockjs-client';
import STOMP from 'stompjs';

import { updatePage } from '../application/actions';
import { 
  updateSetting
 } from '../room/actions';


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

/**
 * @description connect user to room and return the socket object. This can be called from other dispatchers
 * to add additional subscribtion
 */
const _connectUser = (code) => {
  return (dispatch, getState) => {
    //const { code } = getState().room.code;
    const LABOWLET_PATH = '/labowlet/'

    const socket = new SockJS(`${configs.sk}${LABOWLET_PATH}`);
    const socketClient = STOMP.over(socket);

    socketClient.connect({}, async (frame) => {
      
      /**
       * Connect player to room page and access the payload obj.
       */
      socketClient.subscribe(`/room/${code}`, function (payload) {
        const { command, body } = payload;
        const parsedBody = JSON.parse(body);
        
        if (command === 'MESSAGE' && parsedBody.id === 'ROOM') {
          const data = parsedBody.payload;
          dispatch(updateSetting(data));
        }
      });

      /**
       * Connect player to active game socket
       */
      socketClient.subscribe(`/room/${code}/game`, function (payload) {
        const { command, body } = payload;
        const parsedBody = JSON.parse(body);
        
        if (command === 'MESSAGE' && parsedBody.id === 'GAME') {
          const data = parsedBody.payload;
          // TODO dispatch game result
        }
      });

      dispatch(updatePage('LOBBY'));
      dispatch(actions.connectUser(socketClient));
    });

  }
}

export default {
  updateUserName,
  updateUserId,
  updateUserTeam,
  updateUserWords,
  connectUser,
};