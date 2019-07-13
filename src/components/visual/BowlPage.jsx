import React, { PureComponent } from 'react';
//import 
import connectToRedux from '../ReduxConnector';

import PlayerIcon from './common/PlayerIcon';

import '../../styles/bowl.scss';


/**
 * @class LobbyPage
 */
class BowlPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
    this.addWord = this.addWord.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  addWord() {
    // TODO add insert word function
    console.log(this.state.value);

    // Reset value
    this.setState({
      value: '',
    })

  }

  removeWord(index) {
    // TODO add remove word function
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  /**
   * @function _renderWords
   * @description Renders all the words from you and your partner
   * @private
   */
  _renderWords(words) {
    return words.map((value, index) => (
      <p className="words">{index + 1}. {value}</p>
    ))
  }

  render() {
    //const { roomSettings, benchPlayers } = this.props.room.settings;
    const tempWords = ['sponge', 'bob', 'yo yo', 'space' ,'more' ,'words', 'haha'];
    const players = [
      {
        id: 1,
        name: "jim",
        isReady: false,
      },
      {
        id: 2,
        name: "Adc",
        isReady: false,
      },
      {
        id: 3,
        name: "bdc",
        isReady: false,
      },
      {
        id: 4,
        name: "dc",
        isReady: true,
      }
    ];
    const pendingPlayers = players.map((player) => <PlayerIcon color={player.isReady ? 'green' : 'red'} key={player.id} name={player.name}/>);

    return (
      <div className="bowl">
        <div className="page-container">
          <p>Bowl</p>
          <div className="words-container">
            {this._renderWords(tempWords)}
          </div>
          {/* <input className="word-input" onKeyDown={(e) => this.addWord(e)} /> */}
          <div >
            <input className="word-input" type="text" value={this.state.value} onChange={this.handleChange} />
            <button className="word-submit" onClick={this.addWord}>Submit</button>
            <button className="word-submit" onClick={() => this.props.wordReady()}>Test Next Page</button>
          </div>
        </div>
        <div className="page-footer">
          <div className="foot-header">
            <h3>Players waiting: </h3>
          </div>
          {pendingPlayers}
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: ['room'],
  actions: ['addWord', 'wordReady'],
}

export default connectToRedux(BowlPage, connectObject);