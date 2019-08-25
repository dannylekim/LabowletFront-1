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

  componentDidUpdate(prevProps) {
    if (this.props.gameType !== prevProps.gameType ) {
      this.setState({
        ready: false,
      })
    }
  }

  render() {
    return (
      <div className="game-container__content">
        {
          this.state.ready ?
            (<div className="game-container__actor-area">
              The word is
              <h2 className="game-container__word">{this.props.word}</h2>
              { (this.props.canSkip && this.props.maxWords === 1) && 'Last word! Can\'t skip anymore.'}
              <div className="game-container__actions game-container__options">
                {this.props.canSkip && <button disabled={this.props.maxWords === 1} onClick={() => this.props.handleSkip()}>Skip</button>}
                <button onClick={() => this.props.handleGiveUp()}>Give up</button>
              </div>
              <div className="game-container__actions">
                <button onClick={() => this.props.handleGotIt()}>Got it!</button>
              </div>
            </div>) : (
              <div className="game-container__actions">
                <button className="actor-ready" onClick={(e) => this.handleReady(e)}>Ready</button>
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
        onMouseDown={() => this.setState({ pressed: true })}
        onMouseUp={() => this.setState({ pressed: false })}
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
            canSkip={this.props.room.settings.roomSettings.allowSkips}
            maxWords={this.props.game.remainingWords}
            gameType={this.props.game.gameType}
            word={this.props.game.currentWord}
            handleGotIt={() => this.props.sendWord(this.props.game.currentWord)}
            handleSkip={() => this.props.sendWord()}
            handleGiveUp={() => this.props.giveUpRound()}
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
            {gameType.replace(/_/gi, ' ')}
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
  states: ['game', 'room'],
  actions: ['sendWord', 'startStep', 'giveUpRound'],
}

export default connectToRedux(GamePage, connectObject);