import React, { PureComponent } from 'react';
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
          joinTeam={this._joinTeam}
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

  _joinTeam(teamId) {
    console.log('joined team', teamId);
    this.props
      .joinTeam(teamId, 'temp', this.props.user.token)
      .then(() => {
        alert('success!');
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {});
  }

  addTeam(e) {
    // Hacky way to do On submit
    if(e.key === 'Enter'){
      if (!this.state.isMaxed) {
        const teamName = e.target.value;
        
        // send request
        this.props.createTeam(teamName).then(() => {
          console.log('hooray')
        }).catch(err => {
          console.error(err);
        }).finally(() => {
          let isMaxed = false;
          console.log(this.props.room.settings.teams.find((value) => value.name === 'Empty Slot'));
          // Checked if we reach max team creation
          if(!!this.props.room.settings.teams.find((value) => value.name === 'Empty Slot')) {
            isMaxed = true;
          }

          this.setState({
            createModalIsVisible: false,
            isMaxed,
          });
        });
      }
    }
  }

  render() {
    const roomCode = this.props.room.code || 'UH OH';
    const { roomSettings, benchPlayers, teams } = this.props.room.settings;
    console.log(this.props.room.settings);
    const benchPlayersIcons = benchPlayers.map(player => (
      <PlayerIcon key={player.id} name={player.name} />
    ));
    // By default we render 0 teams, user will have to create them themselves
    const teamList = this._renderTeam(teams); // (roomSettings.maxTeams);
    console.log(this.props.room);
    //const addButton = ;

    return (
      <div className="lobby">
        <div className="page-container">
          <p>Code is</p>
          <h1>{roomCode}</h1>
          {teamList}
          {this.state.isMaxed ? (
            ''
          ) : (
            <div className="add-team-btn" onClick={() => this.setState({ createModalIsVisible: true })}>
              +
            </div>
          )}
        </div>
        <div className="page-footer">
          <div className="foot-header">
            <h3>Players waiting: </h3>
          </div>
          {benchPlayersIcons}
        </div>
        <Modal
          title="Enter Room Code"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            top: '30vh',
          }}
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
  actions: ['createTeam', 'joinTeam'],
};

export default connectToRedux(LobbyPage, connectObject);
