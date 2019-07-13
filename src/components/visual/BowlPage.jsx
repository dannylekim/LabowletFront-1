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
      wordList: [],
    }
    this.handleChange = this.handleChange.bind(this);
  }
  
  addWord(word) {
    if (word === '') {
      alert('No empty string!');
      return;
    }
    // TODO add insert word function

    const dupWords = this.state.wordList.find((myWord) => myWord === word);
    const newList = this.state.wordList;
    if(dupWords) {
      alert(`${word} already exist in your list. try something else`);
    } else {
      newList.push(word);
    }
    // Reset value
    this.setState((prev) => {
      return {
        value: '',
        wordList: newList,
      }
    })

  }

  submitWords() {
    try {
      this.props.submitWords(this.state.wordList)
    } catch (err) {

    }
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
    const pendingPlayers = [...this.props.game.listOfWordsReady].map((player) => <PlayerIcon color={player.isReady ? 'green' : 'red'} key={player.player.id} name={player.player.name}/>);

    return (
      <div className="bowl">
        <div className="page-container">
          <p>Bowl</p>
          <div className="words-container">
            {this._renderWords(this.state.wordList)}
          </div>
          {/* <input className="word-input" onKeyDown={(e) => this.addWord(e)} /> */}
          <div >
            <input className="word-input" type="text" value={this.state.value} onChange={this.handleChange} />
            <button className="word-submit" onClick={() => this.addWord(this.state.value)}>Submit</button>
            <button className="word-submit" onClick={() => this.props.wordReady()}>Test Next Page</button>
          </div>
        </div>
        <div className="page-footer">
          <div className="foot-header">
            <h3>Players status: </h3>
          </div>
          {pendingPlayers}
        </div>
      </div>
    );
  }
}

const connectObject = {
  states: ['room', 'game'],
  actions: ['addWord', 'wordReady'],
}

export default connectToRedux(BowlPage, connectObject);