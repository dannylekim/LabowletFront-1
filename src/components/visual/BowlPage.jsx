import React, {PureComponent} from 'react';
import Swal from 'sweetalert2'

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
      Swal.fire({
        type: 'error',
        text: 'No empty string!'
      });
      return;
    }

    const dupWords = this.state.wordList.find((myWord) => myWord === word);
    const newList = this.state.wordList;
    if(dupWords) {
      Swal.fire({
        type: 'warning',
        text: `${word} already exist in your list. try something else`
      });
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
      console.error(err.message)
    }
  }

  /**
   * @description remove words in list by index
   * @param {number} index 
   */
  removeWord(index) {
    const copyList = [...this.state.wordList];
    copyList.splice(index, 1);

    this.setState({
      wordList: copyList,
    });
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
      <div className="words">
        <button className="remove-words-btn" onClick={() => this.removeWord(index)}>X</button>
        <p>{value}</p>
      </div>
    ))
  }

  render() {
    //const { roomSettings, benchPlayers } = this.props.room.settings;
    const pendingPlayers = this.props.game.listOfWordsReady.map((player) => <PlayerIcon
        color={player.completed ? '#47f57b' : '#f57373'} key={player.player.id} name={player.player.name}
        id={player.player.uniqueIconReference} fill={player.completed ? `#000` : `#fff`}/>);
    const maxWordsLimit = this.props.room.settings.roomSettings.wordsPerPerson;
    const isHost = (this.props.user.id === this.props.room.settings.host.id);
    return (
      <div className="bowl">
        <div className="page-container">
          <div className="words-container">
            {this._renderWords(this.state.wordList)}
          </div>
          {(this.state.wordList.length < maxWordsLimit) ?
            (<div className="add-word__container">
              <div className="add-word-options">
                <input
                    className="word-input"
                    type="text"
                    value={this.state.value}
                    maxLength={50}
                    onChange={this.handleChange}
                    onKeyPress={(event) => event.key === 'Enter' ? this.addWord(this.state.value): ''}
                />
                <button className="word-submit" onClick={() => this.addWord(this.state.value)}>Add</button>
              </div>
              <p>Enter {maxWordsLimit} words for the game! Think of something original! 😃</p>
            </div>)
          :
            (
              isHost ? <p>Waiting on everyone to submit words</p> : <p>Waiting on host to continue</p>
            )
          }
          <div>
            {(this.state.wordList.length === maxWordsLimit) && <button className="word-submit" onClick={() => this.submitWords()}>Submit</button>}
            {isHost && <button className={`word-submit ${this.props.game.readyState.word ? '': 'disabled-btn'}`} onClick={() => this.props.wordReady()} disabled={!this.props.game.readyState.word}>Start</button>}
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
  states: ['room', 'game', 'user'],
  actions: ['submitWords', 'wordReady'],
}

export default connectToRedux(BowlPage, connectObject);