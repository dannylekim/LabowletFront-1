import * as actions from './actions';
import UserRequests from '../../services/UserHTTPRequests';
import RoomRequests from '../../services/RoomHTTPRequests';

import { RoomSettings } from '../../services/Adapters';
import UserActions from '../user/actionDispatchers';
import {
  updateUserToken,
  updateUserTeam,
} from '../user/actions'
import ApplicationActions from '../application/actionDispatchers';

/**
 * @function createRoom
 * @description Creates a user and a room with settings passed in params.
 * The user is created here in order to have a default user prior to room creation
 * @param {Object} newSetting
 */
const createRoom = (newSetting) => {
  return async (dispatch, getState) => {
    try {
      // We want to check that at least 1 round is selected
      const { rounds } = { ...newSetting };
      const hasRounds = [...rounds].reduce((acc, value) => {
        if(value.value){
          acc = value;
        }
        return acc;
      }, false);

      if (!hasRounds) {
        throw new Error('You have to select a round dawg :\\');
      }

      dispatch(ApplicationActions.resetLoad());

      /**
       * Create user body
       */
      const body = {
        name: getState().user.name,
      };

      /**
       * Await create user request
       */
      const userResponse = await UserRequests.createUser(body, getState().application.server.url);

      if (userResponse.status < 400 && userResponse.status >= 200) {
        const formattedSettings = RoomSettings(newSetting);
        const authToken = userResponse.headers['x-auth-token'];

        /**
         * Give user an id locally and update local settings
         */
        dispatch(updateUserToken(authToken));
        dispatch(UserActions.updateUserId(userResponse.data.id))
        dispatch(actions.updateSetting(formattedSettings));
        /**
         * Await create room request
         */
        const roomResponse = await RoomRequests.createRoom(getState().room.settings, authToken, (progress) => {
          dispatch(ApplicationActions.loadTo(progress.loaded))
        }, getState().application.server.url);

        if (roomResponse.status < 400 && roomResponse.status >= 200) {
          /**
           * update room's code and settings
           */
          dispatch(actions.updateCode(roomResponse.data.roomCode));
          dispatch(actions.updateSetting(roomResponse.data));

          /**
           * socket events that on redux change go here
           */
          dispatch(UserActions.connectUser(roomResponse.data.roomCode));
          //dispatch(ApplicationActions.updatePage('LOBBY'));

        } else {
          throw new Error('Must have at least one round');
        }
      } else {
        throw new Error(`There was an issue creating user: ${getState().user.name}`);
      }
    } catch (e) {
      throw e;
    }
  };
};

/**
 * @function joinRoom join room action dispatcher
 * @description Function will create a new user based on name in User reducer and joins a room session
 * only if the room code is correct.
 * @param {String} code 
 */
const joinRoom = (code) => {
  return async (dispatch, getState) => {
    try {

      /**
       * Create user body
       */
      const body = {
        name: getState().user.name,
      };

      /**
       * Await create user request
       */
      const userResponse = await UserRequests.createUser(body, getState().application.server.url);

      if (userResponse.status === 200) {
        const authToken = userResponse.headers['x-auth-token'];

        dispatch(updateUserToken(authToken));
        dispatch(UserActions.updateUserId(userResponse.data.id));

        /**
         * Await create room request
         */
        const roomResponse = await RoomRequests.joinRoom(
          {
            code
          }, authToken
          ,(progress) => {
            dispatch(ApplicationActions.loadTo(progress.loaded))
          }, getState().application.server.url,
        );

        if (roomResponse.status < 400 && roomResponse.status >= 200) {

          dispatch(actions.updateCode(roomResponse.data.roomCode));
          dispatch(actions.updateSetting(roomResponse.data));

          dispatch(UserActions.connectUser(roomResponse.data.roomCode));

        } else {
          if (roomResponse.status === 404) {
            throw new Error('Invalid room code');          
          } else {
            throw new Error('Uh oh! Something other than error 404 occured.');          
          }
        }
      } else {
        throw new Error(`There was an issue creating user: ${getState().user.name}`);
      }
    } catch (e) {
      throw e;
    }
  };
}

const createTeam = (teamName) => {
  return async (dispatch, getState) => {
    try {
      const body = {
        teamName,
      }
      getState().user.socket.send(`/server/room/${getState().room.code}/addWords`, {
        'X-Auth-Token': getState().user.token,
      }, JSON.stringify(['tests', 'biotch', 'ass', 'niggaa']));

      // Post create Team req
      const createTeamResponse = await RoomRequests.createTeam(body, getState().user.token, (progress) => {
        dispatch(ApplicationActions.loadTo(progress.loaded))
      }, getState().application.server.url);

      if (createTeamResponse.status === 200) {
        // Go through the room object and find our user id that matches the team's member id thenset that team id for ourself
        const myTeamId = [...createTeamResponse.data.teams].reduce((acc, team) => {
          team.teamMembers.forEach(element => {
            if (element.id === getState().user.id) {
              acc = team.teamId;
            }
          });
          return acc;
        }, '');
        dispatch(updateUserTeam(myTeamId));
      } else {
        throw createTeamResponse;
      }
    } catch (err) {
      throw err;
    }
  }
}

const joinTeam = (teamId, teamName) => {
  return async (dispatch, getState) => {
    try {
      const body = {
        teamName,
      }
      const joinTeamResponse = await RoomRequests.joinTeam(teamId, body, getState().user.token, (progress) => {
        dispatch(ApplicationActions.loadTo(progress.loaded))
      }, getState().application.server.url);  
      if (joinTeamResponse.status === 200) {
        dispatch(updateUserTeam(teamId));
      } else {
        throw joinTeamResponse;
      }
    } catch (err) {
      throw new Error(`room::joinTeam dipatcher: ${err.message}`);
    }
  }
}

/**
 * request used by host to notift server that players are teamed up and ready to go
 * 
 * will notify erver which will respond with a socket message `/client/room/${code}/state/word`
 */
const lobbyReady = () => {
  return async (dispatch, getState) => {
    try {
      await RoomRequests.stageReady(getState().user.token,'setupGame' , null, getState().application.server.url);
    } catch (err) {
      const errMessage = `room::lobbyReady ${err.message}`
      console.error(errMessage);
      throw new Error(errMessage);
    }
  }
}


// addWord here
const submitWords = (words) => {
  return async (dispatch, getState) => {
    try {
      await getState().user.socket.send(`/server/room/${getState().room.code}/addWords`,{}, JSON.stringify(
        words
      ))
    } catch (err) {
      const errMessage = `room::addWord ${err.message}`
      console.error(errMessage);
      throw new Error(errMessage);
    }
  }
}
/**
 * request used by host to notify server that words are listed and ready to go
 */
const wordReady = () => {
  return async (dispatch, getState) => {
    try {
      await RoomRequests.stageReady(getState().user.token, 'startGame' , null, getState().application.server.url);

    } catch (err) {
      const errMessage = `room::wordReady ${err.message}`
      console.error(errMessage);
      throw new Error(errMessage);
    }
  }}

export default {
  createRoom,
  joinRoom,
  createTeam,
  joinTeam,
  submitWords,
  lobbyReady,
  wordReady,
};