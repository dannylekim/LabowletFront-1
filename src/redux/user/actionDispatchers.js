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

    socketClient.connect({
      'X-Auth-Token': getState().user.token,
    }, async (frame) => {
      
      /**
       * Connect player to room page and access the payload obj.
       */
      socketClient.subscribe(`/client/room/${code}`, function (payload) {
        const { body } = payload;
        const parsedBody = JSON.parse(body);
        console.log('helloo');
        console.log(payload);
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
        const {ready, usersStatus} = JSON.parse(body);

        
        // Navigate user to BOWL page if not done already.
        if(getState().application.page !== 'BOWL') {
          dispatch(updatePage('BOWL'));
        }

        // Init/reset word readiness status here.
        if (ready) {
          return dispatch({
            type: 'UPDATE_READY_WORD',
            status: false,
          });
        }

        // Init/reset word list here 
        dispatch({
          type: 'UPDATE_WORD_LIST',
          list: usersStatus,
        });
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

        const {ready, usersStatus} = parsedBody;

        // If everyone is ready, allow host to click ready button
        if (ready) {
          return dispatch({
            type: 'UPDATE_READY_WORD',
          });
        }

        // Always update the wordlist progress whenever this message get called.
        // The words are NOT stored here.
        dispatch({
          type: 'UPDATE_WORD_LIST',
          list: usersStatus,
        });
      });
      
      // Subscribe to error endpoint /client/errors
      /**
       * subscribe  to error message 
       */
      socketClient.subscribe(`/user/client/errors`, function (payload) {
        const { body } = payload;
        const parsedBody = JSON.parse(body);
        console.log('yaaay');
        console.log(parsedBody);
        // socketClient.data
        // TODO dispatch game result

      });

      
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