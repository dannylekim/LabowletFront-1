import React, { PureComponent } from 'react';

import connectToRedux from '../ReduxConnector';

import '../../styles/game.scss';

class Actor extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
  }

  handleReady(e) {
    this.setState({
      ready: true,
    });
    this.props.start();
  }

  render() {
    return (
      <div className="game-container__content">
        {
          this.state.ready ?
            (<div className="game-container__actor-area">
              <h3 className="game-container__word">{this.props.word}</h3>
              <div className="game-container__actions">
                {this.props.canSkip && <button onClick={() => this.props.handleSkip()}>Skip</button>}
                <button onClick={() => this.props.handleGotIt()}>Got it!</button>
              </div>
            </div>) : (
              <div className="game-container__actions">
                <button onClick={(e) => this.handleReady(e)}>Ready</button>
              </div>
            )
        }
      </div>
    );
  }
}
const Guesser = () => {
  return (
    <div className="game-container__content">
      Don't look at me! Pay attention to your partner!
    </div>
  )
}
class Spectator extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false,
    }
  }
  render() {
    return (
      <div
        className="game-container__content game-container__tappable"
        onTouchStart={() => this.setState({ pressed: true })}
        onTouchEnd={() => this.setState({ pressed: false })}
      >
        <h3>Sit back and relax!</h3>
        <code>But pay attention!</code>
        <p>Press and hold me to see your score.</p>
        { this.state.pressed && (
          <div className="current-score">{this.props.score}</div>
        )}
      </div>
    );
  }
}

/**
 * @class GamePage
 */
class GamePage extends PureComponent {
  /**
   * @function _renderButton
   * @description Depending on user's status player/guesser they will either see a skip button or pass
   * @param {boolean} playerStatus 
   */
  _renderView(playerStatus){
    switch(playerStatus) {
      case 'ACTOR':
        return (
          <Actor
            word={this.props.game.currentWord}
            handleGotIt={() => this.props.sendWord(this.props.game.currentWord)}
            handleSkip={() => this.props.sendWord()}
            start={() => this.props.startStep()}
          />
        );
      case 'GUESSER':
        return <Guesser/>;
      case 'SPECTATOR':
        return (
          <Spectator
            score={this.props.game.teamPoints}
          />
        );
      default:
        return 'Who the hell are you? How did u get here?';
    }
  }

  render() {

    const { status, gameType, currentTime } = this.props.game;

    return (
      <div className="game">
        <div className="page-container">
          <div className="game-type">
            {gameType}
          </div>
          <div className="game-timer">
            <h2>
              <span className="game-time-seconds">{currentTime}</span>
              s
            </h2>
          </div>
          <div className="game-container">
            You are {status}
            {this._renderView(status.toUpperCase())}
          </div>
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: ['game'],
  actions: ['sendWord', 'startStep'],
}

export default connectToRedux(GamePage, connectObject);