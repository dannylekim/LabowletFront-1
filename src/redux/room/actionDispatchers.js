import * as actions from './actions';
import UserRequests from '../../services/UserHTTPRequests';
import RoomRequests from '../../services/RoomHTTPRequests';

import {RoomSettings} from '../../services/Adapters';
import UserActions from '../user/actionDispatchers';
import {overrideUser, updateUserTeam, updateUserToken} from '../user/actions';
import ApplicationActions from '../application/actionDispatchers';
import {
  overrideGame,
  updateGameType,
  updatePoints,
  updateStatus,
  setMaxTime,
  updateGameTime,
  setScoreSummary,
} from '../game/actions';

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

        // store/update token to localstorage
        localStorage.setItem('labowless_token', authToken);
        /**
         * Give user an id locally and update local settings
         */
        dispatch(updateUserToken(authToken));

        dispatch(UserActions.updateUserId(userResponse.data.id, 99))
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
          dispatch(UserActions.updateUserId(userResponse.data.id, roomResponse.data.host.uniqueIconReference));


          /**
           * socket events that on redux change go here
           */
          dispatch(UserActions.connectUser(roomResponse.data.roomCode));
          dispatch(ApplicationActions.updatePage('LOBBY'));

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

        // store/update token to localstorage
        localStorage.setItem('labowless_token', authToken);

        dispatch(updateUserToken(authToken));
        dispatch(UserActions.updateUserId(userResponse.data.id, 99));

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
          const uniqueIconReference = roomResponse.data.benchPlayers.filter(benchPlayer => benchPlayer.id === userResponse.data.id)[0].uniqueIconReference;
          dispatch(UserActions.updateUserId(userResponse.data.id, uniqueIconReference));

          dispatch(UserActions.connectUser(roomResponse.data.roomCode));
          dispatch(ApplicationActions.updatePage('LOBBY'));


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
  }
}

const reconnect = (token) => {
  return async (dispatch, getState) => {
    try {
      const reconnectSession = await RoomRequests.reconnect(token,  getState().application.server.url);
      const {
        currentlyIn,
        game,
        player,
        room,
        team,
      } = reconnectSession.data;
      if(player) {
        dispatch(overrideUser(player));
        dispatch(updateUserToken(token));
      }
      if (room) {
        const { roomCode, roomSettings , host } = room;
        console.log(room)
        dispatch(actions.updateCode(roomCode));
        dispatch(actions.updateSetting({ host, roomSettings, ...roomSettings }));
        dispatch(setMaxTime(roomSettings.roundTimeInSeconds));
        dispatch(UserActions.connectUser(roomCode));
      }

      if (team) {
        dispatch(updateUserTeam(team.teamId));
      }
      if (game) {
        const {
          // round
          currentActor,
          currentGuesser,
          currentRound,
          // teamScore,
          currentScores,
          currentTeam,
          teams,
        } = game;
        const { roundName } = currentRound;

        dispatch(overrideGame(game));

        if(currentScores) {
          const { scores } = currentScores;
          dispatch(setScoreSummary(scores));
          dispatch(ApplicationActions.updatePage('SUMMARY'));
          
          // TODO update the team's score
          const { teamScore } = teams.find((element) => element.teamId === getState().user.team);
          
          dispatch(updatePoints(teamScore.totalScore));
        }
        if (currentlyIn === 'GAME') {
          let userStatus = 'SPECTATOR';
          if (currentActor.id === getState().user.id) {
            userStatus = 'ACTOR';
          } else if (currentGuesser.id === getState().user.id) {
            userStatus = 'GUESSER';
          }
  
          // update user's status
          dispatch(updateStatus(userStatus));
          // update game type
          dispatch(updateGameType(roundName));
          // TODO update the team's score
          const { teamScore } = teams.find(
            element => element.teamId === getState().user.team,
          );

          if ((getState().game.currentTime <= 0 )||(currentTeam.teamId !== getState().game.currentTeam && getState().game.currentTime < getState().game.maxTime)) {
            dispatch(updateGameTime(getState().game.maxTime) || 0);
          } 
  
          dispatch(updatePoints(teamScore.totalScore));
        }

      }

      dispatch(ApplicationActions.updatePage(currentlyIn));
    } catch (err) {
      const errMessage = `room::reconnect ${err.message}`
      console.error(errMessage);
      throw err;
    }
  }
}


export default {
  createRoom,
  joinRoom,
  createTeam,
  joinTeam,
  submitWords,
  lobbyReady,
  wordReady,
  reconnect,
};