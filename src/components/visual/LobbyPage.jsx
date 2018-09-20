import React, { PureComponent } from 'react';

import connectToRedux from '../ReduxConnector';

import '../../styles/lobby.scss';


/**
 * @class LobbyPage
 */
class LobbyPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const roomCode = this.props.room.code || 'UH OH';
    return (
      <div className="page home">
        <div className='navbar'>
          <h2>Lobby Room</h2>
        </div>
        <div className="page-container">
          <p>Code is</p>
          <h1>{roomCode}</h1>
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: ['room'],
  actions: [],
}

export default connectToRedux(LobbyPage, connectObject);