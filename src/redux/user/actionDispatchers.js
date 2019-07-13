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
const connectUser = (code) => {
  return (dispatch, getState) => {
    //const { code } = getState().room.code;
    const LABOWLET_PATH = '/socket'

    const socket = new SockJS(`${getState().application.server.url || configs.prod}${LABOWLET_PATH}`, null , {
      debug: (str) => {
        console.log(str);
      },
    });
    const socketClient = STOMP.over(socket);

    socketClient.reconnect_delay = 5000;

    socketClient.connect({}, async (frame) => {
      
      /**
       * Connect player to room page and access the payload obj.
       */
      socketClient.subscribe(`/client/room/${code}`, function (payload) {
        const { body } = payload;
        const parsedBody = JSON.parse(body);
        dispatch(updateSetting(parsedBody));
      });

      /**
       * Connect player to active game socket
       */
      socketClient.subscribe(`/client/room/${code}/game`, function (payload) {
        const { body } = payload;
        const parsedBody = JSON.parse(body);
   
          //const data = parsedBody.payload;
          // TODO dispatch game result
      });
      
      /**
       * Used to notifify user to move from `LobbyPage` to `BowlPage`
       */
      socketClient.subscribe(`/client/room/${code}/state/word`, function (payload) {
        const { body } = payload;
        // const { usersStatus } = JSON.parse(body);
        const d = JSON.parse(body);

        console.log('You\'re read to start! lets go');
        console.log(d);
        //const data = parsedBody.payload;
          // TODO dispatch game result
      });

      /**
       * Used to notifify user that room is ready
       */
      socketClient.subscribe(`/client/room/${code}/state/game`, function (payload) {
        const { body } = payload;
        const { usersStatus } = JSON.parse(body);
        

          //const data = parsedBody.payload;
          // TODO dispatch game result
      });

      /**
       * Message to add word
       */
      socketClient.subscribe(`/client/room/${code}/addWords`, function (payload) {
        const { body } = payload;
        const parsedBody = JSON.parse(body);
        console.log('yaaay');
        console.log(parsedBody);
        // socketClient.data
          // TODO dispatch game result

      });

      // Subscribe to error endpoint /client/errors

      
      dispatch(updatePage('LOBBY'));
      dispatch(actions.connectUser(socketClient));
    });

  }
}

export default{
  connectUser,
  updateUserName,
  updateUserId,
  updateUserTeam,
  updateUserWords,
};