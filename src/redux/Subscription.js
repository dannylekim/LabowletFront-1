import {updatePage} from './application/actions;
import {updateSetting} from './room/actions';
import {
  resetGame,
  updateContent,
  updateCurrentTeam,
  updateGameTime,
  updateGameType,
  updateGameWord,
  updatePoints,
  updateRemainingWordCount,
  updateStatus,
  updateWordReady,
  setMaxTime,
  setScoreSummary,
} from './game/actions'

export default class UserSubscription {
  constructor({socketClient, dispatch, getState, code}) {
    this.socketClient = socketClient;
    this.dispatch = (args) => dispatch(args);
    this.getState = () => getState();

    this.socketClient.subscribe(`/client/room/${code}`, connectToRoom(payload));
    this.socketClient.subscribe(`/client/room/${code}/game`, function (payload));
  }

  /**
  * Connect player to room page and access the payload obj.
  */
  connectToRoom(payload) {
    const { body } = payload;
    const parsedBody = JSON.parse(body);
    this.dispatch(updateSetting(parsedBody));
  };

        /**
       * Called when user start a game, round ends or turn ends. Return a Game object
       * which contains 
       * @param {Object} round
       * @param {Object} currentPlayer
       * @param {Object} currountActor
       */
  receiveGame(payload) {
    const { body } = payload;
    const parsedBody = JSON.parse(body);
    const {
          // round
      currentActor,
      currentGuesser,
      currentRound,
      currentTeam,
      currentScores,
      teams,
    } = parsedBody;
    const { roundName } = currentRound;
    // First thing: reset time/word
    if ((this.getStates.game.currentTime <= 0 )||(currentTeam !== this.getState.game.currentTeam && this.getState.game.currentTime < this.getState.game.maxTime)) {
      if(this.getState.game.maxTime === 0) {
        this.dispatch(updateGameTime(this.getState.room.settings.roomSettings.roundTimeInSeconds) || 0);
      } else {
        this.dispatch(updateGameTime(this.getState.game.maxTime) || 0);
          }
        } 
        dispatch(updateGameWord(''));
        dispatch(setScoreSummary([]));
        /**
         * currentActor: {name: "host", id: "8210aebc-9bef-4299-a717-a81e808e239f"}
         * currentGuesser: {name: "fast guy", id: "ee847daa-9c35-4bcc-91ff-f70690353147"}
         * currentRound: {roundName: "DESCRIBE_IT", turns: 0, randomWord: "aa"}
         */
        
        let userStatus = 'SPECTATOR';
        if(currentActor.id === getState().user.id) {
          userStatus = 'ACTOR';
        } else if (currentGuesser.id === getState().user.id) {
          userStatus = 'GUESSER';
        }
        
        // update user's status
        dispatch(updateStatus(userStatus));

        dispatch(updateCurrentTeam(currentTeam))
        
        // update game type
        dispatch(updateGameType(roundName))

        if(currentScores) {
          const { scores } = currentScores;
          dispatch(setScoreSummary(scores));
          dispatch(updatePage('SUMMARY'));
          
          // TODO update the team's score
          const { teamScore } = teams.find((element) => element.teamId === getState().user.team);
          
          dispatch(updatePoints(teamScore.totalScore));
        } else if (getState().application.page !== 'GAME') {
        // If we're not on  GAME page, go there
        // important that it must be AFTER the user has their status updated.
          dispatch(updatePage('GAME'));
        }
  };
};



