import React, { PureComponent } from 'react';

import connectToRedux from '../ReduxConnector';

import '../../styles/score.scss';

/**
 * @class GamePage
 */
class ScorePage extends PureComponent {
  constructor(props) {
    super(props);
    window.onbeforeunload = () => this.manuallyLeave();
  }

  componentWillUnmount() {
    window.onbeforeunload = () => {};
  }

  manuallyLeave = () => {
    try {
      // remove user from room.
      this.props.leaveRoom();
      this.props.updatePage('HOME');

      // remove localstoarage
      localStorage.removeItem('labowless_token');
    } catch (err) {
      console.error('Uh oh houston, we have a prpblem while disconnect -> ', err.message);
    }
  }

  formatData(teamContent) {
    return (
      <div className="team-row">
        <div>{teamContent.teamName}</div>
        <div>{teamContent.totalScore}</div>
      </div>
    )
  }
  render() {
    const { content } = this.props.game;
    const result = content.sort((a, b) => b.totalScore - a.totalScore).map(this.formatData);

    return (
      
        <div className="page-container">
          <div className="title">
            Game Over
          </div>
          <div className="score-page__results">
            {result}
          </div>
          <div className="score-page__actionable">
            <button onClick={() => this.manuallyLeave()}>Take me home</button>
            <button onClick={() => this.props.resetGame()}>Create new game</button>
          </div>
        </div>
    
    );
  }
}

const connectObject = {
  states: ['game', 'room'],
  actions: ['resetGame','leaveRoom'],
}

export default connectToRedux(ScorePage, connectObject);