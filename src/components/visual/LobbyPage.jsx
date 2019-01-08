import React, { PureComponent } from 'react';

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
    }
    this._joinTeam = this._joinTeam.bind(this);
  }

  /**
   * Create Team cards per max team
   * @private
   */
  _renderTeam(maxTeams) {
    const TeamCardArray = [];
    for(let i = 0; i< maxTeams; i++) {
      TeamCardArray.push(<TeamCard index={i + 1} key={i+1} joinTeam={this._joinTeam} teamMates={'todo'}/>)
    }
    
    return TeamCardArray;
  }

  _joinTeam(teamId) {
    console.log('joined team', teamId)
  }

  render() {
    const roomCode = this.props.room.code || 'UH OH';
    const { roomSettings, benchPlayers } = this.props.room.settings;
    console.log(benchPlayers);
    const benchPlayersIcons = benchPlayers.map((player) => <PlayerIcon key={player.id} name={player.name}/>);
    const teamList = this._renderTeam(roomSettings.maxTeams);

    return (
      <div className="lobby">
        <div className="page-container">
          <p>Code is</p>
          <h1>{roomCode}</h1>
          {teamList}
        </div>
        <div className="page-footer">
          <div className="foot-header">
            <h3>Players waiting: </h3>
          </div>
          {benchPlayersIcons}
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: ['room', 'user'],
  actions: ['joinTeam'],
}

export default connectToRedux(LobbyPage, connectObject);