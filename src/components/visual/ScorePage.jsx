import React, { PureComponent } from 'react';

import connectToRedux from '../ReduxConnector';

import '../../styles/game.scss';

/**
 * @class GamePage
 */
class ScorePage extends PureComponent {

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
          <div>
            {result}
          </div>
        </div>
    
    );
  }
}

const connectObject = {
  states: ['game', 'room'],
  actions: ['sendWord', 'startStep'],
}

export default connectToRedux(ScorePage, connectObject);