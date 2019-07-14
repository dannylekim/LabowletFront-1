import React, { PureComponent } from 'react';

import connectToRedux from '../ReduxConnector';

import '../../styles/score.scss';

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
          <div className="score-page__results">
            {result}
          </div>
          <div className="score-page__actionable">
            <button onClick={() => this.props.updatePage('HOME')}>Take me home</button>
            <button onClick={() => this.props.updatePage('CREATE')}>Create new game</button>
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