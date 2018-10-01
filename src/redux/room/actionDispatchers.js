import actions from './actions';
import UserRequests from '../../services/UserHTTPRequests';
import RoomRequests from '../../services/RoomHTTPRequests';

import Adapters from '../../services/Adapters';
import UserActions from '../user/actionDispatchers';
import ApplicationActions from '../application/actionDispatchers';

/**
 * Creates a user and a room with settings passed in params.
 * The user is created here in order to have a default user prior to room creation
 * @param {Object} newSetting
 */
const createRoom = (newSetting) => {
  return async (dispatch, getState) => {
    try {
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
      const userResponse = await UserRequests.createUser(body);

      if (userResponse.status === 200) {
        const formattedSettings = Adapters.RoomSettings(newSetting);
        const authToken = userResponse.headers['x-auth-token'];

        dispatch(UserActions.updateUserId(userResponse.data.id))
        dispatch(actions.updateSetting(formattedSettings));

        /**
         * Await create room request
         */
        const roomResponse = await RoomRequests.createRoom(getState().room.settings, authToken, (progress) => {
          dispatch(ApplicationActions.loadTo(progress.loaded))
        });

        if (roomResponse.status === 200) {
          const pendingSetting = Object.assign(roomResponse.data.roomSettings, { benchPlayers: roomResponse.data.benchPlayers })
          dispatch(actions.updateCode(roomResponse.data.roomCode));
          dispatch(actions.updateSetting(pendingSetting));
          dispatch(ApplicationActions.updatePage('LOBBY'))
        } else {
          throw new Error('Something went wrong...', roomResponse)
        }
      } else {
        throw new Error(`There was an issue creating user: ${getState().user.name}`);
      }
    } catch (e) {
      alert('createRoom::Something terrible went wrong...')
    }
  };
};

/**
 * @function joinRoom join room action dispatcher
 * @description Function will create a new user based on name in User reducer and joins a room session
 * only if the room code is correct.
 * @param {String} roomCode 
 */
const joinRoom = (roomCode) => {
  return async (dispatch, getState) => {

    /**
     * Create user body
     */
    const body = {
      name: getState().user.name,
    };

    /**
     * Await create user request
     */
    const userResponse = await UserRequests.createUser(body);

    if (userResponse.status === 200) {
      const authToken = response.headers['x-auth-token'];

      dispatch(UserActions.updateUserId(response.data.id));

      /**
      * Await create room request
      */
      const roomResponse = RoomRequests.joinRoom({ roomCode }, authToken, (progress) => {
        dispatch(ApplicationActions.loadTo(progress.loaded))
      });

      if (!!roomResponse && roomResponse.status === 200) {
        const pendingSetting = Object.assign(roomResponse.data.roomSettings, { benchPlayers: roomResponse.data.benchPlayers })
        dispatch(actions.updateCode(roomResponse.data.roomCode));
        dispatch(actions.updateSetting(pendingSetting));

        dispatch(ApplicationActions.updatePage('LOBBY'))
      } else {
        throw new Error('Something went wrong...', roomResponse)
      }
    } else {
      throw new Error('joinRoom::Error creating user');
    }
    //UserRequests.createUser(body).then((response) => {

    // RoomRequests.joinRoom({ roomCode }, authToken, (progress) => {
    //   dispatch(ApplicationActions.loadTo(progress.loaded))
    // }).then((roomResponse) => {


    // }).catch((err) => {
    //   console.error('Error while joining room in redux:', err)
    // })
    // }).catch ((err) => {
    //   console.error('Error while creating user in redux:', err);
    // });
  };
}

export default {
  createRoom,
  joinRoom,
};