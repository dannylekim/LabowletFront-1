import React, {PureComponent} from 'react';
import Modal from 'rmc-dialog';

import connectToRedux from '../ReduxConnector';

import TeamCard from './common/TeamCard';
import PlayerIcon from './common/PlayerIcon';

import '../../styles/lobby.scss';

/**
 * @class LobbyPage
 */
class LobbyPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMaxed: false,
      createModalIsVisible: false,
      myTeamName: ''
    };
    this._joinTeam = this._joinTeam.bind(this);
  }

  /**
   * @function _checkMax
   * @description 
   */
  _checkMax() {
    let isMaxed = false;
    // Checked if we reach max team creation
    if(!!this.props.room.settings.teams.find((value) => value.name === 'Empty Slot')) {
      isMaxed = true;
    }
    this.setState({isMaxed});

  }

  /**
   * Create Team cards per max team
   * @private
   */
  _renderTeam(teams) {
    //const TeamCardArray = [];
    // for(let i = 0; i< maxTeams; i++) {
    //   TeamCardArray.push(<TeamCard index={i + 1} key={i+1} joinTeam={this._joinTeam} teamMates={'todo'}/>)
    // }
    const TeamCardArray = teams
      .filter((value, index) => {

        if (value.teamMembers.length === 0) {
          return false;
        }

        
        return value;
      })
      .map(value => (
        <TeamCard
          key={value.teamId}
          joinTeam={() => this._joinTeam(value.teamId, value.teamName)}
          name={value.teamName}
          teamMates={value.teamMembers}
        />
      ));

    if (
      TeamCardArray.length === this.props.room.settings.roomSettings.maxTeams
    ) {
      this.setState({
        isMaxed: true,
      });
    }
    return TeamCardArray;
  }

  _joinTeam(teamId, teamName) {
    this.props
      .joinTeam(teamId, teamName, this.props.user.token)
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        this._checkMax()
      });
  }

  addTeam(e) {
    // Hacky way to do On submit
    if(e.key === 'Enter'){
      if (!this.state.isMaxed) {
        const teamName = e.target.value;
        
        // send request
        this.props.createTeam(teamName).catch(err => {
          console.error(err);
        }).finally(() => {
          this._checkMax();
          this.setState({
            createModalIsVisible: false,
          });
        });
      }
    }
  }

  startGame() {
    this.props.startGame();
  }

  copyToClip(code) {
    navigator.clipboard.writeText(code).then(() => alert('copied code'));
  }

  render() {
    const roomCode = this.props.room.code || 'UH OH';
    const { benchPlayers, teams } = this.props.room.settings;
    const benchPlayersIcons = benchPlayers.map(player => (
        <PlayerIcon key={player.id} name={player.name} id={player.uniqueIconReference} fill={`#000`}/>
    ));
    // By default we render 0 teams, user will have to create them themselves
    const teamList = this._renderTeam(teams); // (roomSettings.maxTeams);

    const isAdmin = this.props.user.id === this.props.room.settings.host.id;
    const canStart = this.props.room.settings.canStart;

    return (
      <div className="lobby">
        <div className="page-container">
          <p>Code is</p>
          <h1 onClick={() => this.copyToClip(roomCode)}>{roomCode}</h1>
          {teamList}
          <div className="page-container__team-list">
            {this.state.isMaxed ? (
              ''
            ) : (
              <div className="add-team-btn" onClick={() => this.setState({ createModalIsVisible: true })}>
                +
              </div>
            )}
          </div>
        </div>
        {isAdmin && <button disabled={!canStart} className={`generic-start-btn ${canStart ? '' : 'disabled-btn'}`}
                            style={{color: `white`}} onClick={() => this.props.lobbyReady()}>Start</button>}
        <div className="page-footer">
          <div className="foot-header">
            <h3>Players waiting: </h3>
          </div>
          {benchPlayersIcons}
        </div>
        <Modal
          title="Enter Team name"
          className="team-name-modal"
          visible={this.state.createModalIsVisible}
          animation="zoom"
          maskAnimation="fade"
          maskClosable={true}
          onClose={() => {
            this.setState({ createModalIsVisible: false });
          }}
        >
          <input placeholder="Enter Team Name" onKeyPress={(e) => this.addTeam(e)} type="text"/>
        </Modal>
      </div>
    );
  }
}

const connectObject = {
  states: ['room', 'user'],
  actions: ['createTeam', 'joinTeam', 'lobbyReady'],
};

export default connectToRedux(LobbyPage, connectObject);
